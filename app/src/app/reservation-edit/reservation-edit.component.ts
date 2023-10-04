import {Component, OnInit, SecurityContext} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatIconModule} from "@angular/material/icon";
import {MatNativeDateModule} from "@angular/material/core";
import {MatTooltipModule} from "@angular/material/tooltip";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../auth/auth.service";
import {Reservation} from "../models/reservation";
import {map, of, switchMap} from "rxjs";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {User} from "../models/user";
import {DomSanitizer} from "@angular/platform-browser"

@Component({
  selector: 'app-reservation-edit',
  standalone: true,
  imports: [
    CommonModule, MatInputModule, MatFormFieldModule, FormsModule, MatButtonModule, RouterLink,
    MatDatepickerModule, MatIconModule, MatNativeDateModule, MatTooltipModule, MatSelectModule
  ],
  templateUrl: './reservation-edit.component.html',
  styleUrls: ['./reservation-edit.component.css']
})
export class ReservationEditComponent implements OnInit {
  phoneNumberPattern = "^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$"
  reservation!: Reservation;
  user!: User;
  feedback: any = {};
  currentDate = new Date(new Date().setDate(new Date().getDate() + 1))
  timeList = ["10:00:00", "11:00:00", "12:00:00", "13:00:00", "14:00:00", "15:00:00"]
  locationList = ['Ampara', 'Anuradhapura', 'Badulla', 'Batticaloa', 'Colombo', 'Galle', 'Gampaha',
    'Hambantota', 'Jaffna', 'Kalutara', 'Kandy', 'Kegalle', 'Kilinochchi', 'Kurunegala', 'Mannar', 'Matale', 'Monaragala',
    'Mullaitivu', 'Nuwara Eliya', 'Polonnaruwa', 'Puttalam', 'Ratnapura', 'Trincomalee', 'Vavuniya']
  countryList = [
    "Afghanistan",
    "Åland Islands",
    "Albania",
    "Algeria",
    "American Samoa",
    "Andorra",
    "Angola",
    "Anguilla",
    "Antarctica",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Aruba",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas (the)",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bermuda",
    "Bhutan",
    "Bolivia (Plurinational State of)",
    "Bonaire, Sint Eustatius and Saba",
    "Bosnia and Herzegovina",
    "Botswana",
    "Bouvet Island",
    "Brazil",
    "British Indian Ocean Territory (the)",
    "Brunei Darussalam",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Cayman Islands (the)",
    "Central African Republic (the)",
    "Chad",
    "Chile",
    "China",
    "Christmas Island",
    "Cocos (Keeling) Islands (the)",
    "Colombia",
    "Comoros (the)",
    "Congo (the Democratic Republic of the)",
    "Congo (the)",
    "Cook Islands (the)",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Curaçao",
    "Cyprus",
    "Czechia",
    "Côte d'Ivoire",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic (the)",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Falkland Islands (the) [Malvinas]",
    "Faroe Islands (the)",
    "Fiji",
    "Finland",
    "France",
    "French Guiana",
    "French Polynesia",
    "French Southern Territories (the)",
    "Gabon",
    "Gambia (the)",
    "Georgia",
    "Germany",
    "Ghana",
    "Gibraltar",
    "Greece",
    "Greenland",
    "Grenada",
    "Guadeloupe",
    "Guam",
    "Guatemala",
    "Guernsey",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Heard Island and McDonald Islands",
    "Holy See (the)",
    "Honduras",
    "Hong Kong",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran (Islamic Republic of)",
    "Iraq",
    "Ireland",
    "Isle of Man",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jersey",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Korea (the Democratic People's Republic of)",
    "Korea (the Republic of)",
    "Kuwait",
    "Kyrgyzstan",
    "Lao People's Democratic Republic (the)",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Macao",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands (the)",
    "Martinique",
    "Mauritania",
    "Mauritius",
    "Mayotte",
    "Mexico",
    "Micronesia (Federated States of)",
    "Moldova (the Republic of)",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Montserrat",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands (the)",
    "New Caledonia",
    "New Zealand",
    "Nicaragua",
    "Niger (the)",
    "Nigeria",
    "Niue",
    "Norfolk Island",
    "Northern Mariana Islands (the)",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Palestine, State of",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines (the)",
    "Pitcairn",
    "Poland",
    "Portugal",
    "Puerto Rico",
    "Qatar",
    "Republic of North Macedonia",
    "Romania",
    "Russian Federation (the)",
    "Rwanda",
    "Réunion",
    "Saint Barthélemy",
    "Saint Helena, Ascension and Tristan da Cunha",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Martin (French part)",
    "Saint Pierre and Miquelon",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Sint Maarten (Dutch part)",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Georgia and the South Sandwich Islands",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan (the)",
    "Suriname",
    "Svalbard and Jan Mayen",
    "Sweden",
    "Switzerland",
    "Syrian Arab Republic",
    "Taiwan (Province of China)",
    "Tajikistan",
    "Tanzania, United Republic of",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tokelau",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Turks and Caicos Islands (the)",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates (the)",
    "United Kingdom of Great Britain and Northern Ireland (the)",
    "United States Minor Outlying Islands (the)",
    "United States of America (the)",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Venezuela (Bolivarian Republic of)",
    "Viet Nam",
    "Virgin Islands (British)",
    "Virgin Islands (U.S.)",
    "Wallis and Futuna",
    "Western Sahara",
    "Yemen",
    "Zambia",
    "Zimbabwe"
  ]
  userCountry!: string;
  userPhone!: string;
  formSubmitted: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router,
              private http: HttpClient, private auth: AuthService, private sanitizer: DomSanitizer) {
  }

  async ngOnInit() {
    await this.notAuthorizedRedirectToHome();
    this.http.get<User>('api/get_saved_user').subscribe((data: User) => {
      this.user = data;
      this.userCountry = this.user.country;
      this.userPhone = this.user.contactNumber;
    });
    this.route.params.pipe(
      map(p => p['id']),
      switchMap(id => {
        if (id === 'new') {
          return of(new Reservation());
        }
        return this.http.get<Reservation>(`api/reservation/${id}`);
      })
    ).subscribe({
      next: reservation => {
        this.reservation = reservation;
        this.feedback = {};
      },
      error: () => {
        this.feedback = {type: 'warning', message: 'Error loading'};
      }
    });
  }

  async notAuthorizedRedirectToHome() {
    if (!await this.auth.isAuthenticated()) {
      await this.router.navigate(["home"])
    }
  }

  save() {
    this.formSubmitted = true;
    if (
      !this.sanitizer.sanitize(SecurityContext.HTML, this.userPhone) ||
      !this.sanitizer.sanitize(SecurityContext.HTML, this.userCountry) ||
      !this.sanitizer.sanitize(SecurityContext.HTML, this.reservation.date) ||
      !this.sanitizer.sanitize(SecurityContext.HTML, this.reservation.time) ||
      !this.sanitizer.sanitize(SecurityContext.HTML, this.reservation.location) ||
      !this.sanitizer.sanitize(SecurityContext.HTML, this.reservation.vehicle_no) ||
      !this.sanitizer.sanitize(SecurityContext.HTML, this.reservation.mileage) ||
      !this.sanitizer.sanitize(SecurityContext.HTML, this.reservation.message)
    ) {
      this.formSubmitted = false;
      this.feedback = {type: 'error', message: 'Some Fields entered contain bad values.'};
      return;
    }
    if (this.userPhone === null || this.userCountry === null) {
      this.formSubmitted = false
      this.feedback = {type: 'error', message: 'Some Required Fields are empty.'};
    }
    this.user.country = this.userCountry;
    this.user.contactNumber = this.userPhone;
    this.reservation.phone = this.userPhone;
    const id = this.reservation.id;
    const method = id ? 'put' : 'post';

    this.http[method]<Reservation>(`/api/reservation${id ? '/' + id : ''}`,
      method === "post" ? {
        "reservation": this.reservation,
        "user": this.user
      } : this.reservation
    ).subscribe({
      next: () => {
        this.feedback = {type: 'success', message: 'Save was successful!'};
        setTimeout(async () => {
          await this.router.navigate(['/reservations']);
        }, 1000);
      },
      error: () => {
        this.formSubmitted = false
        this.feedback = {type: 'error', message: 'Error saving'};
      }
    });
  }

  async cancel() {
    await this.router.navigate(['/reservations']);
  }
}
