package kz.erasyl.volunteerback.services;


import kz.erasyl.volunteerback.models.*;
import kz.erasyl.volunteerback.repos.VolunteerEventRegistrationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class VolunteerEventRegistrationService {
    private final VolunteerEventRegistrationRepository volunteerEventRegistrationRepository;
    private final EventService eventService;
    private final VolunteerService volunteerService;
    private final UserService userService;

    public Boolean registrationToTheEvent(Long eventId, Long volunteerId) {

        if (eventService.getEventById(eventId) == null || volunteerService.getVolunteerById(volunteerId) == null) {
            return false;
        }
        VolunteerEventRegistration event = VolunteerEventRegistration.builder()
                .approved(false)
                .volunteer(volunteerService.getVolunteerById(volunteerId))
                .event(eventService.getEventById(eventId))
                .build();

        volunteerEventRegistrationRepository.save(event);
        return true;
    }

    public Boolean unregisterFromTheEvent(Long eventId, Long volunteerId) {
        if (checkIfRegistrationExist(eventId, volunteerId)){
            volunteerEventRegistrationRepository.deleteByVolunteerAndEvent(
                    volunteerService.getVolunteerById(volunteerId),
                    eventService.getEventById(eventId)
            );
            return true;
        }
        return false;
    }


    protected Boolean checkIfRegistrationExist(Long eventId, Long volunteerId) {
        if (eventService.getEventById(eventId) == null || volunteerService.getVolunteerById(volunteerId) == null) {
            return false;
        }
        return true;
    }

    public List<Event> getAllEventsByVolunteerId(Long volunteerId) {
       List<VolunteerEventRegistration> volunteerEventRegistrations =  volunteerEventRegistrationRepository.findByVolunteer(volunteerService.getVolunteerById(volunteerId));
       List<Event> events = new ArrayList<>();
       volunteerEventRegistrations.forEach(volunteerEventRegistration ->
               events.add(volunteerEventRegistration.getEvent())
               );
       return events;
    }

    public List<Volunteer> getAllVolunteersByEventId(Long eventId) {
        List<VolunteerEventRegistration> volunteerEventRegistrations = volunteerEventRegistrationRepository.findByEvent(eventService.getEventById(eventId));
        List<Volunteer> volunteers = new ArrayList<>();
        volunteerEventRegistrations.forEach(volunteerEventRegistration ->
                volunteers.add(volunteerEventRegistration.getVolunteer())
        );
        return volunteers;
    }

    public List<Event> getAllEventsByVolunteerUsername(String username) {
        Volunteer volunteer = volunteerService.getVolunteerByName(username);

        List<VolunteerEventRegistration> volunteerEventRegistrations =  volunteerEventRegistrationRepository.findByVolunteer(volunteer);

        List<Event> events = new ArrayList<>();
        volunteerEventRegistrations.forEach(volunteerEventRegistration ->
                events.add(volunteerEventRegistration.getEvent())
        );

        return events;
    }

    public Set<Volunteer> getAllVolunteersOfOrganizationById(Long organizationId) {
        Set<Volunteer> volunteers = new HashSet<>();
        List<Event> events = eventService.getEventsByOrganizationId(organizationId);
        for (Event event : events) {
            volunteers.addAll(getAllVolunteersByEventId(event.getEventId()));
        }
        return volunteers;
    }

    public Set<Organization> getAllOrganizationsOfVolunteer(String username) {
        Set<Organization> organizations = new HashSet<>();
        List<Event> events = getAllEventsByVolunteerUsername(username);
        for (Event event : events) {
            organizations.add(event.getOrganization());
        }
        return organizations;
    }

}
