package com.cg.service.booking;
import com.cg.model.Booking;
import com.cg.model.Customer;
import com.cg.model.DTO.BookingAdminDTO;
import com.cg.model.DTO.BookingDTO;
import com.cg.model.Schedule;
import com.cg.model.enumeration.EGender;
import com.cg.model.enumeration.EStatus;
import com.cg.model.enumeration.EStatusBooking;
import com.cg.repository.IBookingRepository;
import com.cg.service.Customer.ICustomerService;
import com.cg.service.schedule.IScheduleService;
import com.cg.util.EmailUtil;
import com.cg.util.SendEmail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.Timer;
import java.util.TimerTask;

@Service
@Transactional
public class BookingService implements IBookingService {
    @Autowired
    private IBookingRepository iBookingRepository;
    @Autowired
    private IScheduleService scheduleService;
    @Autowired
    private ICustomerService customerService;
    @Autowired
    private EmailUtil emailUtil;
    @Override
    public List<Booking> findAll() {
        return iBookingRepository.findAll();
    }

    @Override
    public Optional<Booking> findById(Long id) {
        return iBookingRepository.findById(id);
    }

    @Override
    public void save(Booking booking) {
        iBookingRepository.save(booking);
    }

    @Override
    public void deleteById(Long id) {
        iBookingRepository.deleteById(id);
    }

    @Override
    public List<Booking> findAllByCustomerId(Long customerId) {
        return iBookingRepository.findAllByCustomerId(customerId);
    }

    @Override
    public Booking findByCustomerIdAndScheduleId(Long customerId, Long scheduleId) {
        return iBookingRepository.findByCustomerIdAndScheduleId(customerId,scheduleId);
    }

    @Override
    public List<Booking> findByClinicIdAndBookingDate(Long clinicId, String bookingDate) {
        return iBookingRepository.findByClinicIdAndBookingDate(clinicId,bookingDate);
    }

    public List<Booking> getAllBookingByClinicId(Long clinicId) {
        return iBookingRepository.findAllByClinicId(clinicId);
    }

    public List<Booking> getAllBookingByClinicIdAndSearch(Long clinicId, String search) {
        return iBookingRepository.findAllByClinicIdAndSearch(clinicId, search);
    }

    @Override
    public List<Booking> findAllByDoctorId(Long doctorId) {
        return iBookingRepository.findAllByDoctorId(doctorId);
    }

    @Override
    public List<Booking> findByClinicIdAndDoctorIdAndBookingDateAndStatus(Long clinic_id, Long doctor_id, String bookingDate, EStatusBooking status) {
        return iBookingRepository.findByClinicIdAndDoctorIdAndBookingDateAndStatus(clinic_id,doctor_id,bookingDate,status);
    }

    @Override
    public List<Booking> findByCustomerIdAndDoctorIdAndStatus(Long customerId, Long doctorId, EStatusBooking status) {
        return iBookingRepository.findByCustomerIdAndDoctorIdAndStatus(customerId,doctorId,status);
    }

    public List<Booking> getAllBookingByClinicIdAndCustomerId(Long clinicId, Long customerId) {
        return iBookingRepository.findAllByClinicIdAndCustomerId(clinicId, customerId);
    }

    public void createBooking(BookingDTO bookingDTO) {
        Schedule schedule = scheduleService.findById(bookingDTO.getScheduleId()).get();
        schedule.setStatus(EStatus.SELECTED);
        Customer customer = customerService.findByUser_Id(bookingDTO.getUserId());
        Booking booking = new Booking().setDoctor(schedule.getDoctor()).setCustomer(customer).setClinic(schedule.getDoctor().getClinic()).setSchedule(schedule)
                .setBookingDate(bookingDTO.getBookDay()).setBookingTime(schedule.getTimeItem()).setFee(schedule.getDoctor().getFee())
                .setCreateAt(LocalDate.now())
                .setStatus(EStatusBooking.CONFIRMING);
        if(bookingDTO.getReason() != null){
            booking.setReason(bookingDTO.getReason());
        }
        if(bookingDTO.getPatientName() == null){
            booking.setPatientName(customer.getFullName());
        }else{
            booking.setPatientName(bookingDTO.getPatientName());
        }
        iBookingRepository.save(booking);
        String url = "http://localhost:8080/api/booking/confirm/" + booking.getCustomer().getId() + "/" + booking.getSchedule().getId();
        String title="Xác nhận đặt lịch hẹn khám tại ZCare";
        String body= SendEmail.EmailScheduledSuccessfully(
                booking.getCustomer().getFullName(),booking.getBookingDate(),schedule.getTimeItem(),url);
        emailUtil.sendEmail( booking.getCustomer().getEmail(),title,body);

        Timer timer = new Timer();
        TimerTask task = new TimerTask() {
            @Override
            public void run() {
                Booking bookingConfirm = findById(booking.getId()).get();
                Schedule scheduleConfirm = scheduleService.findById(schedule.getId()).get();
                if (bookingConfirm.getStatus().equals(EStatusBooking.CONFIRMING)) {
                    scheduleConfirm.setStatus(EStatus.AVAILABLE);
                    scheduleService.save(scheduleConfirm);
                    deleteById(bookingConfirm.getId());
                }
                timer.cancel();
            }
        };
        timer.schedule(task, 5*60*1000);
    }


    @Scheduled(cron = "0 */5 * * * *")
    public void checkBookingDatesAndSendReminderEmails() {
        String currentDate = LocalDate.now().format(DateTimeFormatter.ofPattern("dd/M/yyyy"));
        List<Booking> bookings = iBookingRepository.findByBookingDate(currentDate);
        String title = "Nhắc nhở lịch khám bệnh";
        for (Booking booking : bookings) {
            if (!booking.getReminderSent() && booking.getStatus()==EStatusBooking.CUSTOMERCONFIMED) {
                String body = SendEmail.ExamScheduleReminder(booking.getCustomer().getFullName(), booking.getBookingDate(), booking.getBookingTime());
                emailUtil.sendEmail( booking.getCustomer().getEmail(),title,body);
                booking.setReminderSent(true);
                iBookingRepository.save(booking);
            }
        }
    }

    @Scheduled(cron = "0 */5 * * * *")
    public void setSchedule() {
        String currentDate = LocalDate.now().format(DateTimeFormatter.ofPattern("d/M/yyyy"));
        List<Booking> bookingSetSchedule = iBookingRepository.findAll();
        for(Booking booking :bookingSetSchedule){
            LocalDate bookingDate = LocalDate.parse(booking.getBookingDate(), DateTimeFormatter.ofPattern("d/M/yyyy"));
            LocalDate currentDateParsed = LocalDate.parse(currentDate, DateTimeFormatter.ofPattern("d/M/yyyy"));
            if (currentDateParsed.isAfter(bookingDate)) {
                Schedule schedule = scheduleService.findById(booking.getSchedule().getId()).get();
                schedule.setStatus(EStatus.AVAILABLE);
                scheduleService.save(schedule);
            }
        }
    }

    public void createBookingAdmin(BookingAdminDTO bookingAdminDTO) {
        Schedule schedule = scheduleService.findById(bookingAdminDTO.getScheduleId()).get();
        schedule.setStatus(EStatus.SELECTED);
        Optional<Customer> customer = customerService.findCustomerByEmail(bookingAdminDTO.getEmailCus());
        if(customer.isEmpty()){
            Customer customerNew=new Customer();
            customerNew.setGender(EGender.valueOf(bookingAdminDTO.getGender()));
            customerNew.setPhone(bookingAdminDTO.getPhoneCus());
            customerNew.setEmail(bookingAdminDTO.getEmailCus());
            customerNew.setFullName(bookingAdminDTO.getCustomerName());
            customerNew.setAddress(bookingAdminDTO.getAddress());
            customerNew.setDob(LocalDate.parse(bookingAdminDTO.getDobCus()));
            customerService.save(customerNew);
            Booking booking = new Booking().setDoctor(schedule.getDoctor()).setClinic(schedule.getDoctor().getClinic()).setCustomer(customerNew).setSchedule(schedule)
                    .setBookingDate(bookingAdminDTO.getBookDay()).setBookingTime(schedule.getTimeItem()).setFee(schedule.getDoctor().getFee())
                    .setCreateAt(LocalDate.now())
                    .setStatus(EStatusBooking.CUSTOMERCONFIMED)
                    .setReminderSent(true);
            if(bookingAdminDTO.getReason() != null){
                booking.setReason(bookingAdminDTO.getReason());
            }
            iBookingRepository.save(booking);
        }
    }

}
