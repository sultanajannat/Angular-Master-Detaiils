import { NotifyService } from './../../services/notify.service';
import { DataService } from './../../services/data.service';
import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Skills } from '../../models/skills';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})
export class MasterComponent {

  skillList: Skills[] = [];
  candidatePicture: File = null!;

  constructor(
    public dataSvc: DataService,
    private router: Router,
    private notifySvc: NotifyService
  ) { }

  candidateForm: FormGroup = new FormGroup({
    candidateId: new FormControl(undefined, Validators.required),
    candidateName: new FormControl(undefined, Validators.required),
    birthDate: new FormControl(undefined),
    phoneNo: new FormControl(undefined, Validators.required),
    fresher: new FormControl(undefined, Validators.required),
    skillsList: new FormArray([])
  });

  get SkillListArray() {
    return this.candidateForm.controls["skillsList"] as FormArray;
  }

  addSkills() {
    this.SkillListArray.push(new FormGroup({
      skillId: new FormControl(undefined, Validators.required)
    }));
  }

  removeSkillList(index: number) {
    if (this.SkillListArray.controls.length > 0)
      this.SkillListArray.removeAt(index);
  }

  ngOnInit() {
    this.dataSvc.getSkillList().subscribe((result) => {
      this.skillList = result;
    });
    this.addSkills();
  }

  //onFileSelected(event: any) {
  //  this.candidatePicture = event.target.files[0];
  //}
  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.candidatePicture = event.target.files[0];
    }
  }

  //InsertCandidate() {

  //  var formData = new FormData();

  //  formData.append("skillsStringify", JSON.stringify(this.candidateForm.get("skillsList")?.value));
  //  formData.append("candidateName", this.candidateForm.get("candidateName")?.value);
  //  formData.append("birthDate", this.candidateForm.get("birthDate")?.value);
  //  formData.append("phoneNo", this.candidateForm.get("phoneNo")?.value);
  //  formData.append("fresher", this.candidateForm.get("fresher")?.value);
  //  formData.append("pictureFile", this.candidatePicture, this.candidatePicture.name);

  //  this.dataSvc.postCandidateSkill(formData).subscribe(
  //    {
  //      next: r => {
  //        console.log(r);
  //        this.router.navigate(['/masterdetails']);
  //        this.notifySvc.message('Data insered successfull!!!', 'DISMISS');
  //      },
  //      error: err => {
  //        console.log(err);
  //      }
  //    }
  //  );

  //}
  InsertCandidate() {
    var formData = new FormData();

    formData.append("skillsStringify", JSON.stringify(this.candidateForm.get("skillsList")?.value));
    formData.append("candidateName", this.candidateForm.get("candidateName")?.value);
    formData.append("birthDate", this.candidateForm.get("birthDate")?.value);
    formData.append("phoneNo", this.candidateForm.get("phoneNo")?.value);
    formData.append("fresher", this.candidateForm.get("fresher")?.value);

    // Check if a picture is provided before appending it to the formData
    if (this.candidatePicture !== null) {
      formData.append("pictureFile", this.candidatePicture, this.candidatePicture.name);
    }

    this.dataSvc.postCandidateSkill(formData).subscribe({
      next: r => {
        console.log(r);
        this.router.navigate(['/masterdetails']);
        this.notifySvc.message('Data inserted successfully!', 'DISMISS');
      },
      error: err => {
        console.log(err);
      }
    });
  }

}

