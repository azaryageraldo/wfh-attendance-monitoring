export declare const Role: {
    readonly ADMIN: "ADMIN";
    readonly EMPLOYEE: "EMPLOYEE";
};
export type Role = (typeof Role)[keyof typeof Role];
export declare const AttendanceStatus: {
    readonly PRESENT: "PRESENT";
    readonly LATE: "LATE";
    readonly LEAVE: "LEAVE";
};
export type AttendanceStatus = (typeof AttendanceStatus)[keyof typeof AttendanceStatus];
