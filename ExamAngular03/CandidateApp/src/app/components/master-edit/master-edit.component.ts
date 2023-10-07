
import { DataService } from './../../services/data.service';
import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { NotifyService } from 'src/app/services/notify.service';
import { Skills } from '../../models/skills';
import { CandidateSkills } from '../../models/candidate-skills';

@Component({
  selector: 'app-master-edit',
  templateUrl: './master-edit.component.html',
  styleUrls: ['./master-edit.component.css']
})
export class MasterEditComponent {
  skillList: Skills[] = [];
  candidatePicture: File = null!;
  candidateSkill: CandidateSkills = { candidateId: undefined, candidateName: undefined, phoneNo: undefined, picture: undefined, fresher: undefined }

  constructor(
    public dataSvc: DataService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private notifySvc: NotifyService
  ) { }

  candidateForm: FormGroup = new FormGroup({

    candidateId: new FormControl(undefined, Validators.required),
    candidateName: new FormControl(undefined, Validators.required),
    birthDate: new FormControl(undefined),
    phoneNo: new FormControl(undefined, Validators.required),
    fresher: new FormControl(undefined, Validators.required),
    skillList: new FormArray([])
  });

  get SkillListArray() {
    return this.candidateForm.controls["skillList"] as FormArray;
  }

  addSkill(item?: Skills) {
    if (item) {
      this.SkillListArray.push(new FormGroup({
        skillId: new FormControl(item.skillId, Validators.required)
      }));
    } else {
      this.SkillListArray.push(new FormGroup({
        skillId: new FormControl(undefined, Validators.required)
      }));
    }

  }

  removeSkill(index: number) {
    if (this.SkillListArray.controls.length > 0)
      this.SkillListArray.removeAt(index);
  }

  ngOnInit() {
    const id = this.activatedRouter.snapshot.params['id'];

    this.dataSvc.getCandidateSkillById(id).subscribe(x => {
      this.candidateSkill = x;

      this.candidateForm.patchValue(this.candidateSkill);

      if (x.birthDate) {
        const birthDate = new Date(x.birthDate);
        const formattedBirthDate = birthDate.toISOString().substring(0, 10);

        this.candidateForm.patchValue({
          birthDate: formattedBirthDate
        });
      }

      this.candidateSkill.skillList?.forEach(item => {
        this.addSkill(item);
      });

    });

    this.dataSvc.getSkillList().subscribe((result) => {
      this.skillList = result;
    });
  }

  onFileSelected(event: any) {
    this.candidatePicture = event.target.files[0];
  }

  UpdateCandidateData() {

    var formData = new FormData();
    formData.append("skillsStringify", JSON.stringify(this.candidateForm.get("skillList")?.value));
    formData.append("candidateId", this.candidateForm.get("candidateId")?.value);
    formData.append("candidateName", this.candidateForm.get("candidateName")?.value);
    formData.append("birthDate", this.candidateForm.get("birthDate")?.value);
    formData.append("phoneNo", this.candidateForm.get("phoneNo")?.value);
    formData.append("fresher", this.candidateForm.get("fresher")?.value);

    if (this.candidatePicture) {
      formData.append("pictureFile", this.candidatePicture, this.candidatePicture.name);
    }

    this.dataSvc.updateCandidateSkill(formData).subscribe(
      {
        next: r => {
          console.log(r);
          this.router.navigate(['/masterdetails']);
          this.notifySvc.message('Data updated successfully !!!', 'DISMISS');
        },
        error: err => {
          console.log(err);
        }
      }
    );

  }
}
