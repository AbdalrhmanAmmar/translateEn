export interface IAddHoliday {
 holidayName: string,
 holidayDate: string,
 holidayType: HolidayTypeEnum,
}

export interface IHoliday {
 id: number,
 holidayName: string,
 holidayDate: string,
 holidayType: HolidayTypeEnum,

}

export interface IGethHolidays {
  holidays: IHoliday[],
  workDaysCount: number,
  holidaysCount: number,
  totalDaysCount: number
}

export interface IWorkDaySettings {

}

export interface IAddWorkDaySettings {
 weekDays : number[],
 fromTime: string | null ,
 toTime: string | null,
}

export interface IGetWorkDaysSettings {
 
}

export enum HolidayTypeEnum
{
 ReligiousHoliday = 1,
 NationalHoliday = 2,
 SpecialHoliday = 3,
 weeklyHoliday = 4,
}

export enum DayOfWeekEnum {
  Saturday = 1,
  Sunday = 2,
  Monday = 3,
  Tuesday = 4,
  Wednesday = 5,
  Thursday = 6,
  Friday = 7,
}