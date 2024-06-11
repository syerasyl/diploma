import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Event } from "../services/models/event";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {User} from "../services/models/user";
import {Volunteer} from "../services/models/volunteer";
import {Organization} from "../services/models/organization";
import {Router} from "@angular/router";
import {MessageService, TreeNode} from "primeng/api";
import {TokenService} from "../services/token/token.service";
import {catchError, throwError} from "rxjs";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {API_URL} from "../core/util/consts";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit{

  userTreeNode : TreeNode[] = [];


  selectedFile: File | null = null;
  avatarUrl: SafeUrl | null = null;
  role: string;
  username: string;

  // volunteers pages navigation
  myProfile: boolean;
  userSettings: boolean;
  volunteerEvents: boolean;
  ratingPageByVolunteer: boolean;

  volunteerRatingForm: FormGroup;
  volunteersAppliedOrganizations: Organization[] = [];


  // organization pages navigation
  organizationProfile: boolean;
  organizationEvents: boolean;
  creationEvent: boolean;
  chosenEventId: number = 0;
  ratingPageByOrganization: boolean;

  showVolunteers: boolean;

  organizationEventsList: Event[] = [];
  organizationEventsVolunteersList: Volunteer[] = [];
  organizationVolunteers: Volunteer[] = [];

  organizationRatingForm: FormGroup;


  // admin pages navigation
  usersList: boolean;
  eventsList: boolean;
  organizationList: boolean;
  loadedVolunteerList: Volunteer[] = [];
  loadedEventsList: Event[] = [];
  loadedOrganizationList: Organization[] = [];

  eventForm: FormGroup;


  myOrganization: Organization = {};


  profileForm: FormGroup;
  changePasswordForm: FormGroup;
  volunteerDetails: Volunteer = {
    volunteerId : 0
  };
  cities : string[] = [];
  events: Event[] = [];

  organizationForm: FormGroup;







  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private eventFormBuilder: FormBuilder,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
    private messageService: MessageService,
    private tokenService: TokenService,
    private sanitizer: DomSanitizer

  ) {
    this.username = userService.username;
    this.role = userService.role;
    this.loadCities();
    this.loadVolunteerData();
    this.loadOrganizationByUsername();

    this.showVolunteers = false;

    // initialization of volunteer
    this.myProfile = true;
    this.userSettings = false;
    this.volunteerEvents = false;
    this.ratingPageByVolunteer = false;

    // initialization of organization

    this.organizationProfile = true;
    this.organizationEvents = false;
    this.creationEvent = false;
    this.ratingPageByOrganization = false;



    // initialization of admin
    this.usersList = true;
    this.eventsList = false;
    this.organizationList = false;
    this.loadUsers();


    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      aboutMe: [''],
      birthday: ['', Validators.required],
      gender: ['', Validators.required],
      experienceMonth: ['', [Validators.required, Validators.min(0)]],
    });

    this.organizationRatingForm = this.fb.group({
      volunteer: ['', Validators.required],
      rating: ['', Validators.required],
      feedback: ['', Validators.required],
    })

    this.volunteerRatingForm = this.fb.group({
      organization: ['', Validators.required],
      rating: ['', Validators.required],
      feedback: ['', Validators.required],
    })

    this.eventForm = this.eventFormBuilder.group({
      eventName: ['', Validators.required],
      eventDescription: ['', Validators.required],
      eventLocation: ['', Validators.required],
      eventStartDate: ['', Validators.required],
      eventEndDate: ['', Validators.required],
      eventType: ['', Validators.required],
      city: ['', Validators.required],
      link: ['', Validators.required]
      // organization: ['', Validators.required]
    });


    this.organizationForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      address: ['', Validators.required],
      phone: [''],
      email: ['', Validators.email],
      bin: [''],
      city: ['', Validators.required],
    });

    this.changePasswordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmationPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });

    this.loadUserEvents();
  }

  passwordMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword')?.value;
    const confirmationPassword = form.get('confirmationPassword')?.value;
    const isMatching = newPassword === confirmationPassword;

    if (!isMatching) {
      this.messageService.add({
        severity: 'error',
        detail: 'Passwords do not match'
      });
    }

    return isMatching ? null : { mismatch: true };
  }

  isNotValidFormNotify(){
    this.messageService.add(
      {
        severity: "error",
        detail: 'Form is not valid, fill all fields.',
      }
    )
  }



  onSubmitPassword(): void {
    if (this.changePasswordForm.valid) {
      const formData = this.changePasswordForm.value;
      const token = this.tokenService.accessToken;
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      const options = { headers: headers };

      this.http.patch(API_URL + '/api/v1/user', formData, options).pipe(
        catchError((error: HttpErrorResponse) => {
          this.messageService.add(
            {
              severity: 'error',
              detail: error.error.error
            }
          )
          if (error.status === 400) {
            console.error('Bad Request:', error.error);
          }
          return throwError(error);
        })

      )
        .subscribe(
        (response) => {
          console.log(response);
          this.messageService.add(
            {
              severity: 'success',
              detail: 'Password change was successfully'
            }
          )
        }
      )
    }
    else {
      this.isNotValidFormNotify();
    }
  }

  volunteer = {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phone": "+1234567890",
    "address": "123 Main St",
    "city": "Anytown",
    "aboutMe": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "birthday": "1990-05-15",
    "gender": "Male",
    "experienceMonth": 12
  }

  organization =  {

  }

  loadCities(){
    this.http.get<string[]>(API_URL + "/api/v1/city/").subscribe(
      (response) => {
        this.cities = response;
      }
    )
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      const formData = this.profileForm.value as Volunteer;
      let userData  = {};
      formData.volunteerId = this.volunteerDetails.volunteerId;
      formData.user = this.volunteerDetails.user;
      this.http.put(API_URL + "/api/v1/volunteer", formData).subscribe(
        (response) => {
          console.log(response);
          this.messageService.add({
            severity: 'info',
            detail: 'Update successfully changed'
          })
        }
      )

      this.profileForm.patchValue(userData);
    } else {
      this.isNotValidFormNotify();
    }
  }

  loadVolunteerData () {
    this.http.get<Volunteer>(`${API_URL}/api/v1/volunteer/username?username=${this.username}`).subscribe(
      (response) => {
        this.volunteerDetails = response;
        console.log(response);
      }
    )
  }

  loadUserData(): void {
    let userData  = {};

      this.http.get<Volunteer>(`${API_URL}/api/v1/volunteer/username?username=${this.username}`).subscribe(
      (response) => {
        console.log(response);
        userData = response;
        this.volunteerDetails = response;
        this.profileForm.patchValue(userData);

      }
    )

  }

  ngOnInit(): void {
    this.loadUserData();
    this.userTreeNode  = [
      {
            label: 'My Profile',
            data: 'Work Folder',
            expandedIcon: 'pi pi-folder-open',
            collapsedIcon: 'pi pi-folder',
            type: 'profile'
          },
          {
            label: 'Settings',
            data: 'Home Folder',
            expandedIcon: 'pi pi-folder-open',
            collapsedIcon: 'pi pi-folder',
            type: 'settings'
      },
      {
        label: 'Events List',
        data: 'Events Folder',
        expandedIcon: 'pi pi-folder-open',
        collapsedIcon: 'pi pi-folder',
        type: 'eventList'
      },
      {
        label: 'Rate',
        data: 'Movies Folder',
        expandedIcon: 'pi pi-folder-open',
        collapsedIcon: 'pi pi-folder',
        type: 'rate'
      }
    ];


  }

  loadUserEvents(){
    this.http.get<Event[]>(API_URL + "/api/v1/event-registration/event/username/" + this.username).subscribe(
      response => {
        this.events = response;
      }
    );
  }


  changeVolunteerLayout(layout: string){
    console.log(layout)
    if (layout === 'settings') {
      this.volunteerEvents = false;
      this.userSettings = true;
      this.myProfile = false;
      this.ratingPageByVolunteer = false;

    }
    if (layout === 'volunteerEvents'){
      this.volunteerEvents = true;
      this.userSettings = false;
      this.myProfile = false;
      this.ratingPageByVolunteer = false;

    }
    if (layout === 'profile'){
      this.volunteerEvents = false;
      this.userSettings = false;
      this.myProfile = true;
      this.ratingPageByVolunteer = false;

    }
    if (layout === 'rate'){
      this.loadVolunteerOrganizations();
      this.volunteerEvents = false;
      this.userSettings = false;
      this.myProfile = false;
      this.ratingPageByVolunteer = true;
    }
  }

  changeOrganizationLayout(layout: string){
    if (layout === 'profile') {
      this.organizationProfile = true;
      this.organizationEvents = false;
      this.creationEvent = false;
      this.ratingPageByOrganization = false;


    }
    if (layout === 'events'){
      this.organizationProfile = false;
      this.organizationEvents = true;
      this.creationEvent = false;
      this.ratingPageByOrganization = false;


    }
    if (layout === 'creationEvent') {
      this.creationEvent = true;
      this.organizationEvents = false;
      this.organizationProfile = false;
      this.ratingPageByOrganization = false;
    }
    if (layout === 'rate') {
      this.creationEvent = false;
      this.organizationEvents = false;
      this.organizationProfile = false;
      this.ratingPageByOrganization = true;
      this.loadOrganizationVolunteers(this.myOrganization.organizationId as number);
    }
  }

  changeAdminLayout(layout: string) {
    console.log(layout);
    if (layout === 'users') {
      this.usersList = true;
      this.eventsList = false;
      this.organizationList = false;

      this.loadUsers();

    }
    if (layout === 'events'){
      this.usersList = false;
      this.eventsList = true;
      this.organizationList = false;
      this.loadEvents();
    }
    if (layout === 'organizations') {
      this.usersList = false;
      this.eventsList = false;
      this.organizationList = true;
      this.loadOrganizations();
    }


  }

  loadOrganizationByUsername(){
    this.http.get<Organization>(API_URL + "/api/v1/organization/username/" + this.username).subscribe(
      (response) => {
        if (response) {
          this.myOrganization = response;
          if (response.organizationId != null){
            this.loadOrganizationEventList(response.organizationId as number);
            this.organizationForm.patchValue(this.myOrganization);
          }
        }
      }
    );
  }

  loadOrganizationEventList(organizationId : number){
    this.http.get<Event[]>(`${API_URL}/api/v1/event/organization/${organizationId}`).subscribe(
      (response) => {
        this.organizationEventsList = response;
      }
    )
  }

  saveOrganizationDetails(){
    if (this.organizationForm.valid) {
      const formData = this.organizationForm.value as Organization;
      formData.organizationId = this.myOrganization.organizationId;
      formData.owner = this.myOrganization.owner;
      this.http.put(`${API_URL}/api/v1/organization`, formData).subscribe(
        (response) => {
          this.messageService.add({
            severity: 'info',
            detail: 'Update successfully changed'
          })
          this.organizationForm.patchValue(response);
        }
      )

    }
    else {
      this.isNotValidFormNotify();
    }
  }


  unapplyToEvent(eventId: number) {

    console.log(this.volunteer);

    const url = `${API_URL}/api/v1/event-registration/unregister?eventId=${eventId}&volunteerId=${this.volunteerDetails.volunteerId}`;
    this.http.delete(url).subscribe(
      (response) => {
        console.log(response);
        this.loadUserEvents();
      }
    );
  }

  unapplyFromEvent(eventId: number, volunteerId?: number) {

    console.log(this.volunteer);

    const url = `${API_URL}/api/v1/event-registration/unregister?eventId=${eventId}&volunteerId=${volunteerId}`;
    this.http.delete(url).subscribe(
      (response) => {
        console.log(response);
        this.loadUserEvents();
      }
    );
  }


  createEventByOrganization() {
    if (this.eventForm.valid){
      console.log('validated')
      const formData = {
        eventName: this.eventForm.get('eventName')?.value,
        eventDescription: this.eventForm.get('eventDescription')?.value,
        eventLocation: this.eventForm.get('eventLocation')?.value,
        eventStartDate: new Date(this.eventForm.get('eventStartDate')?.value).getTime(),
        eventEndDate: new Date(this.eventForm.get('eventEndDate')?.value).getTime(),
        eventType: this.eventForm.get('eventType')?.value,
        city: this.eventForm.get('city')?.value,
        link: this.eventForm.get('link')?.value,
        organization: this.myOrganization,
      };
      this.http.post(`${API_URL}/api/v1/event`, formData).subscribe(
        (response) => {
          this.messageService.add({
            severity: 'success',
            detail: 'New event successfully added'
          })
          this.loadOrganizationEventList(this.myOrganization.organizationId as number)
          this.router.navigate(['user'])
        }
      )
    }
    else {
      this.isNotValidFormNotify();
    }
  }

  deactivateEvent(eventId: number) {
    this.http.delete(`${API_URL}/api/v1/event/event/${eventId}`).subscribe(
      (response) => {
        this.messageService.add({
          severity: 'success',
          detail: 'Event deactivated'
        })
        this.loadOrganizations()      }
    )
  }

  activateEvent(eventId: number) {
    this.http.get(`${API_URL}/api/v1/event/event/${eventId}`).subscribe(
      (response) => {
        this.messageService.add({
          severity: 'success',
          detail: 'Event activated'
        })
        this.loadOrganizations()      }
    )
  }

  loadUsers(){
    this.http.get<Volunteer[]>(`${API_URL}/api/v1/volunteer/`).subscribe(
      (response) =>
      {
        this.loadedVolunteerList = response;
      }
    )
  }

  loadOrganizations(){
    this.http.get<Organization[]>(`${API_URL}/api/v1/organization/`).subscribe(
      (response) =>
      {
        this.loadedOrganizationList = response;
      }
    )
  }

  loadEvents(){
    this.http.get<Event[]>(`${API_URL}}/api/v1/administration/events`).subscribe(
      (response) =>
      {
        this.loadedEventsList = response;
      }
    )
  }

  showVolunteersList(eventId: number) {
    this.chosenEventId = eventId;
    this.showVolunteers = false;
    this.http.get<Volunteer[]>(`${API_URL}/api/v1/event-registration/event/${eventId}`).subscribe(
      (response) => {
        this.organizationEventsVolunteersList = response;
      }
    )

    // todo

    this.showVolunteers = true;

  }

  loadOrganizationVolunteers(organizationId: number) {
    this.http.get<Volunteer[]>(`${API_URL}/api/v1/organization/volunteers?organizationId=` + organizationId).subscribe(
      (response) => {
        this.organizationVolunteers = response;
      }
    )
  }

  rateVolunteerByOrganization() {
    if (this.organizationRatingForm.valid){
      const formData = {
        volunteerRating : this.organizationRatingForm.get('rating')?.value,
        volunteerId: this.organizationRatingForm.get('volunteer')?.value,
        volunteerFeedback: this.organizationRatingForm.get('feedback')?.value,
        organizationId: this.myOrganization.organizationId,
      };
      this.http.post(`${API_URL}/api/v1/rating`, formData).subscribe(
        (response) => {
          this.messageService.add(
            {
              severity: "success",
              summary: 'Rating is successfully added'
            }
          )
        }
      )
    }

    else {
      this.isNotValidFormNotify();
    }
  }

  rateOrganizationByVolunteer() {
    if (this.volunteerRatingForm.valid) {
      const formData = {
        organizationRating : this.volunteerRatingForm.get('rating')?.value,
        organizationId: this.volunteerRatingForm.get('organization')?.value,
        organizationFeedback: this.volunteerRatingForm.get('feedback')?.value,
        volunteerId: this.volunteer.id,
      }
      this.http.post(`${API_URL}/api/v1/rating`, formData).subscribe(
        (response) => {
          console.log(response);
          this.messageService.add(
            {
              severity: "success",
              summary: 'Rating is successfully added'
            }
          )
        }
      )
    }else {
      this.isNotValidFormNotify();
    }
  }
  loadVolunteerOrganizations(){
    this.http.get<Organization[]>(`${API_URL}/api/v1/event-registration/organization/volunteer/` + this.username).subscribe(
      (response) => {
        this.volunteersAppliedOrganizations = response;
      }
    )
  }

  // onFileSelected(event: any): void {
  //   this.selectedFile = event.target.files[0];
  //   this.previewAvatar();
  // }
  //
  // previewAvatar(): void {
  //   if (this.selectedFile) {
  //     const objectUrl = URL.createObjectURL(this.selectedFile);
  //     this.avatarUrl = this.sanitizer.bypassSecurityTrustUrl(objectUrl);
  //   }
  // }
  //
  // loadUserAvatar(): void {
  //   this.userService.getAvatar().subscribe(
  //     (response) => {
  //       const objectUrl = URL.createObjectURL(response);
  //       this.avatarUrl = this.sanitizer.bypassSecurityTrustUrl(objectUrl);
  //     },
  //     (error) => {
  //       console.error('Error loading avatar:', error);
  //       this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load avatar' });
  //     }
  //   );
  // }
  //
  // onUpload(): void {
  //   if (this.selectedFile) {
  //
  //     this.userService.uploadAvatar(this.selectedFile).subscribe(
  //       (response) => {
  //         console.log('Upload successful:', response);
  //         this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Avatar uploaded successfully' });
  //         this.loadUserAvatar();
  //       },
  //       (error) => {
  //         console.error('Upload error:', error);
  //         this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to upload avatar' });
  //       }
  //     );
  //   } else {
  //     console.warn('No file selected');
  //     this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Please select a file' });
  //   }
  // }

}
