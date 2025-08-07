import { Component, inject, signal, WritableSignal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  ButtonDirective,
  CardComponent,
  CardModule,
  ColComponent,
  FormModule,
  FormSelectDirective,
  RatingModule,
  RowComponent,
} from '@coreui/angular-pro';
import { IQuestion } from '../../../core/interfaces/irating';

import { cilSave } from '@coreui/icons';
import { IconDirective } from '@coreui/icons-angular';
import { RatesService } from '../../../core/services//modules-services/rates.service';

import { UserStore } from '../../../core/current-user/user-store';
import {
  IRatingScore,
  RatingCategory,
  IRating,
} from '../../../core/interfaces/irating';
import { NotificationService } from '../../../core/services/helper-services/notification.service';
import { ILookUp } from '../../../core/interfaces/ilookup';

@Component({
  selector: 'app-rate-visits-rep',
  imports: [
    FormModule,
    FormsModule,
    ReactiveFormsModule,
    ColComponent,
    RowComponent,
    CardModule,
    RatingModule,
    ButtonDirective,
    IconDirective,
    FormSelectDirective
  ],
  templateUrl: './rate-visits-rep.component.html',
  styleUrl: './rate-visits-rep.component.scss',
})
export class RateVisitsRepComponent {
  private readonly _FormBuilder = inject(FormBuilder);

  private readonly _RatesService = inject(RatesService);

  icons = { cilSave };

  sections = ['Planning', 'Personal Traits', 'Knowledge', 'Selling Skills'];

  questions: IQuestion[] = [
    {
      title: 'مراجعة المكالمة السابقة ومتابعة ما تم فيها',
      section: 'Planning',
      points: 5,
    },
    {
      title: 'تنظيم المكالمة: الأهداف، المواد الترويجية، تسلسل العرض',
      section: 'Planning',
      points: 5,
    },
    {
      title: 'استهداف العملاء: عادات الوصف، العلامة التجارية المستهدفة',
      section: 'Planning',
      points: 5,
    },
    { title: 'الاهتمام بالمظهر والعرض', section: 'Personal Traits', points: 5 },
    {
      title: 'الثقة، نبرة الصوت، استخدام الأقلام، تدفق المكالمة ونغمتها',
      section: 'Personal Traits',
      points: 5,
    },
    {
      title: 'الالتزام بمواعيد التقارير قبل وبعد الموعد النهائي',
      section: 'Personal Traits',
      points: 5,
    },
    {
      title: 'إجمالي عدد الزيارات والمكالمات (6 زيارات، 3 صيدليات)',
      section: 'Personal Traits',
      points: 5,
    },
    {
      title: 'معرفة توزيع العملاء والوعي بإدارة المنطقة',
      section: 'Knowledge',
      points: 5,
    },
    {
      title: 'المعرفة بالمنتج ورسائله خلال المكالمة',
      section: 'Knowledge',
      points: 5,
    },
    {
      title: 'الافتتاحية: واضحة ومباشرة للموضوع',
      section: 'Selling Skills',
      points: 5,
    },
    {
      title: 'الافتتاحية: متعلقة بالمنتجات',
      section: 'Selling Skills',
      points: 5,
    },
    { title: 'قبول العميل للافتتاحية', section: 'Selling Skills', points: 5 },
    { title: 'استخدام أسلوب التحقيق', section: 'Selling Skills', points: 5 },
    { title: 'مهارات الإصغاء', section: 'Selling Skills', points: 5 },
    {
      title: 'دعم احتياجات العميل الصحيحة',
      section: 'Selling Skills',
      points: 5,
    },
    {
      title: 'استخدام وسائل العرض بشكل صحيح',
      section: 'Selling Skills',
      points: 5,
    },
    { title: 'طلب الأعمال عند الإغلاق', section: 'Selling Skills', points: 5 },
    {
      title: 'الحصول على تغذية راجعة إيجابية عند الإغلاق',
      section: 'Selling Skills',
      points: 10,
    },
    {
      title: 'معالجة الاعتراضات والمخاوف',
      section: 'Selling Skills',
      points: 5,
    },
  ];

  ratings: WritableSignal<number>[] = this.questions.map(() => signal(0));
  medReps : WritableSignal<ILookUp<string>[]> = signal([]);
  medRepsVisitsCodes: WritableSignal<number[]> = signal([]);

  getRatingValue(index: number): number {
    return this.ratings[index]();
  }

  calculateRecommendation(): string {
    const totalPoints = this.totalSelectedPoints;
    const maxPoints = this.maxPoints;
    const percentage = (totalPoints / maxPoints) * 100;
    if (percentage > 85) {
      return 'ممتاز';
    } else if (percentage > 75 && percentage <= 85) {
      return 'يحتاج الى تطوير';
    } else if (percentage > 65 && percentage <= 75) {
      return 'يحتاج الى تدريب';
    } else if (percentage > 55 && percentage <= 65) {
      return 'خطة عمل';
    } else {
      return 'تدريب مبيعات / منتجات';
    }
  }

  calculateMessages(): string[] {
    const messages: string[] = [];
    
    if (this.totalPlanning < 12) {
      messages.push('تحتاج الى تحسين في التخطيط للمكالمات والتحضير المسبق لها');
    }
    if (this.totalPersonalTraits < 16) {
      messages.push('تحتاج الى تطوير في المظهر المهاري والثقة في النفس');
    }
    if (this.totalKnowledge < 8) {
      messages.push('تحتاج الى تدريب على معرفة المنتجات و العملاء');
    }
    if (this.totalSellingSkills < 40) {
      messages.push('تحتاج الى تحسين مهارات البيع و العرض و التواصل');
    }
    return messages;
  }

  get totalPlanning(): number {
    return this.questions.reduce((total, question, i) => {
      if (question.section === 'Planning') {
        return total + this.ratings[i]();
      }
      return total;
    }, 0);
  }

  get totalPersonalTraits(): number {
    return this.questions.reduce((total, question, i) => {
      if (question.section === 'Personal Traits') {
        return total + this.ratings[i]();
      }
      return total;
    }, 0);
  }
  get totalKnowledge(): number {
    return this.questions.reduce((total, question, i) => {
      if (question.section === 'Knowledge') {
        return total + this.ratings[i]();
      }
      return total;
    }, 0);
  }
  get totalSellingSkills(): number {
    return this.questions.reduce((total, question, i) => {
      if (question.section === 'Selling Skills') {
        return total + this.ratings[i]();
      }
      return total;
    }, 0);
  }

  get totalSelectedPoints(): number {
    return this.ratings.reduce((total, rating, i) => total + rating(), 0);
  }

  get maxPoints(): number {
    return this.questions.reduce((total, q) => total + q.points, 0);
  }

  ratingsForm: FormGroup = this._FormBuilder.group({
    medRep: [null, Validators.required],
    ClinicVisitId: [null, Validators.required],
    title: ['', Validators.required],
    recommendation: [''],
    notes: [''],
  });

  submitRating() {
    const formValues = this.ratingsForm.value;

    const sectionScores = new Map<RatingCategory, number>();

    this.questions.forEach((q, index) => {
      const score = this.ratings[index]();
      if (score > 0) {
        const category =
          RatingCategory[q.section as keyof typeof RatingCategory];
        const currentScore = sectionScores.get(category) || 0;
        sectionScores.set(category, currentScore + score);
      }
    });

    const ratingScores: IRatingScore[] = Array.from(
      sectionScores.entries()
    ).map(([category, score]) => ({ category, score }));

    const payload: IRating = {
      ClinicVisitId: formValues.ClinicVisitId,
      type: 1,
      title: formValues.title,
      rateeId: UserStore.UserId(),
      ratingScores,
      recommendation: formValues.recommendation,
      notes: formValues.notes,
    };

    this._RatesService.addRating(payload).subscribe({
      next: (res) => {
         NotificationService.fireNotification("تم تسجيل التقييم بنجاح");
      },
    });
  }

  ngOnInit() {
    this.getSupervisorMedReps();
  }

  getSupervisorMedReps(): void {
    this._RatesService.getSupervisorMedReps().subscribe({
      next: (res : ILookUp<string>[]) => {
        this.medReps.set(res);
      },
    });
  }

  getMedRepsVisitsCodes(medRepId: number): void {
    this._RatesService.getMedRepsVisitsCodes(medRepId).subscribe({
      next: (res: number[]) => {
        this.medRepsVisitsCodes.set(res);
      },
    });
  }

  onMedRepChange(medRepId: number): void {
    this.getMedRepsVisitsCodes(medRepId);
  }
}
