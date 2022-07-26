export const adminMenu = [
    {//quản lý người dùng
        name: 'menu.admin.manage-user',
        menus: [
            { name: 'menu.admin.crud', link: '/system/user-manage' },
            { name: 'menu.admin.crud-redux', link: '/system/user-redux' },
            // { name: 'menu.admin.manage-admin', link: '/system/manage-admin' },
            { name: 'menu.admin.manage-doctor', link: '/system/manage-doctor' },
            { name: 'menu.doctor.doctor-schedule', link: '/doctor/manage-schedule' },
            { name: 'menu.doctor.doctor-schedule', link: '/doctor/manage-patient' },
        ]
    },
    {//quản lý phòng khám
        name: 'menu.admin.clinic',
        menus: [
            { name: 'menu.admin.manage-clinic', link: '/system/manage-clinic' }
        ]
    },
    {//quản lý chuyên khoa
        name: 'menu.admin.specialty',
        menus: [
            { name: 'menu.admin.manage-specialty', link: '/system/manage-specialty' }
        ]
    },
    {//quản lý cẩm nang
        name: 'menu.admin.handbook',
        menus: [
            { name: 'menu.admin.manage-handbook', link: '/system/manage-handbook' }
        ]
    },
];
export const doctorMenu = [
    {//quản lý schedule doctor
        name: 'menu.admin.manage-user',
        menus: [
            { name: 'menu.doctor.doctor-schedule', link: '/doctor/manage-schedule' },
            { name: 'menu.doctor.doctor-patient', link: '/doctor/manage-patient' },
        ]
    },

];