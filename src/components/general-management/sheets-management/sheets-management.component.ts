import { CommonModule } from '@angular/common';
import { Component, signal, WritableSignal } from '@angular/core';
import { CardModule, ColComponent, RowComponent } from '@coreui/angular-pro';

@Component({
  selector: 'app-sheets-management',
  imports: [ColComponent, CommonModule, RowComponent, CardModule],
  templateUrl: './sheets-management.component.html',
  styleUrl: './sheets-management.component.scss'
})
export class SheetsManagementComponent {
sheetTypes = [
  { label: 'أطباء', value: 'doctors' },
  { label: 'منتجات', value: 'products' },
  { label: 'عينات', value: 'samples' },
];

isFileTypeSelected: WritableSignal<boolean> = signal(false);
selectedFile: File | null = null;
uploadStatus: string | null = null;
previewData: any[] = [];
previewColumns: string[] = [];

onFileTypeSelected() {
  this.isFileTypeSelected.set(true);
  this.uploadStatus = 'اختر ملف لتحميله';
}

onFileSelected(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files?.length) {
    this.selectedFile = input.files[0];
    this.uploadStatus = 'جارٍ تحليل الملف...';
    this.previewData = [];
    this.uploadStatus = null;

    this.parseFile(this.selectedFile).then((data) => {
      this.previewData = data;
      this.previewColumns = Object.keys(data[0] || {});
      this.uploadStatus = `تم تحميل ${data.length} صف بنجاح`;
    });
  }
}

async parseFile(file: File): Promise<any[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { Name: 'Example 1', Age: 30 },
        { Name: 'Example 2', Age: 28 },
      ]);
    }, 1000);
  });
}

submitData() {
  console.log('Saving:', this.previewData);
}
}
