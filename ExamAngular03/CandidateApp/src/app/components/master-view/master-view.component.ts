import { NotifyService } from './../../services/notify.service';
import { DataService } from './../../services/data.service';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Skills } from '../../models/skills';
import { CandidateSkills } from '../../models/candidate-skills';

@Component({
  selector: 'app-master-view',
  templateUrl: './master-view.component.html',
  styleUrls: ['./master-view.component.css']
})
export class MasterViewComponent {

  skillList: Skills[] = [];
  candidateList: CandidateSkills[] = [];

  constructor(
    private dataSvc: DataService,
    private notifySvc: NotifyService,
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.dataSvc.getSkillList().subscribe(x => {
      this.skillList = x;
    });
    this.dataSvc.getCandidateSkill().subscribe(x => {
      this.candidateList = x;
    });
  }

  getSkillName(id: any) {
    let data = this.skillList.find(x => x.skillId == id);
    return data ? data.skillName : '';
  }
  OnDelete(item: CandidateSkills): void {
    this.matDialog.open(ConfirmDialogComponent, {
      width: '450px',
      enterAnimationDuration: '500ms'
    }).afterClosed()
      .subscribe(result => {
        if (result) {
          if (item.candidateId) {
            this.dataSvc.deleteCandidateSkill(item.candidateId).subscribe(x => {
              this.candidateList = this.candidateList.filter(x => x.candidateId != item.candidateId);
              this.notifySvc.message('Data Deleted Successfully !!!', 'DISMISS');
            }, error => {
              this.notifySvc.message('There is something wrong !!!', 'DISMISS');
            });
          }
        }
      });
  }


}

