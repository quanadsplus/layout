export default{
    sideBarIcon: [
        {
            link: '',
            href: '#homeDashborad'
            ,menuValue: 'homeDashborad',
            icon: 'las la-tachometer-alt'
        },
        // {
        //     link: '',
        //     href: '#sidebarApps'
        //     ,menuValue: 'sidebarApps',
        //     icon: 'lab la-delicious'
        // },
    ]
    ,
    sideBarList: [
        // {
        //     id:'sidebarApps',
        //     list: [
        //         {
        //             link: '/calendar',
        //             id: '',
        //             value: '',
        //             datakey: 't-calendar',
        //             t:'t-calendar',
        //             list: [],
        //         },
        //         {   
        //             id: '#sidebaremail',
        //             value: 'sidebaremail',
        //             link: '',
        //             datakey: 't-projects',
        //             t: 't-email',
        //             list: [
        //                 {   
        //                     id: '#sidebarsubemail',
        //                     value: 'sidebarsubemail',
        //                     datakey: 't-projects',
        //                     t: 't-email-templates',
        //                     link: '',
        //                     list: [
        //                         {   
        //                             link:'/email/email-basic',
        //                             datakey: 't-products',
        //                             t: 't-basic-action',
        //                         },
        //                         {   
        //                             link:'/email/email-ecommerce',
        //                             datakey: 't-products',
        //                             t: 't-ecommerce-action',
        //                         },
        //                     ]
        //                 },
        //                 {
        //                     id: '',
        //                     value: '',
        //                     list: [],
        //                     link: '/mailbox',
        //                     datakey: 't-mailbox',
        //                     t: 't-mailbox'
        //                 }
        //             ]
        //         }
        //     ]
        // },
        {
            id: 'homeDashborad',
            list: [
                {
                    link: '/dashboard/dashboard-overview',
                    id: '',
                    value: '',
                    datakey: 't-dashboard-overview',
                    t:'t-dashboard-overview',
                    list: [],
                },
                {
                    link: '/dashboard/dashboard-by-service',
                    id: '',
                    value: '',
                    datakey: 't-dashboard-by-service',
                    t:'t-dashboard-by-service',
                    list: [],
                },
                {
                    link: '/dashboard/dashboard-by-contract',
                    id: '',
                    value: '',
                    datakey: 't-dashboard-by-contract',
                    t:'t-dashboard-by-contract',
                    list: [],
                },
              
            ]
        }
    ]
    ,
    sideBarListSm:  [
        // {
        //     link: '',
        //     href: '#sidebarApps'
        //     ,menuValue: 'sidebarApps',
        //     icon: 'lab la-delicious',
        //     id:'sidebarApps',
        //     t: 't-apps',
        //     list: [
        //         {
        //             link: '/calendar',
        //             id: '',
        //             value: '',
        //             datakey: 't-calendar',
        //             t:'t-calendar',
        //             list: [],
        //         },
        //         {   
        //             id: '#sidebaremail',
        //             value: 'sidebaremail',
        //             link: '',
        //             datakey: 't-projects',
        //             t: 't-email',
        //             list: [
        //                 {   
        //                     id: '#sidebarsubemail',
        //                     value: 'sidebarsubemail',
        //                     datakey: 't-projects',
        //                     t: 't-email-templates',
        //                     link: '',
        //                     list: [
        //                         {   
        //                             link:'/email/email-basic',
        //                             datakey: 't-products',
        //                             t: 't-basic-action',
        //                         },
        //                         {   
        //                             link:'/email/email-ecommerce',
        //                             datakey: 't-products',
        //                             t: 't-ecommerce-action',
        //                         },
        //                     ]
        //                 },
        //                 {
        //                     id: '',
        //                     value: '',
        //                     list: [],
        //                     link: '/mailbox',
        //                     datakey: 't-mailbox',
        //                     t: 't-mailbox'
        //                 }
        //             ]
        //         }
        //     ]
        // },
        {
            link: '',
            href: '#homeDashborad'
            ,menuValue: 'homeDashborad',
            icon: 'las la-tachometer-alt',
            id: 'homeDashborad',
            t: 't-dashboards',
            list: [
                {
                    link: '/dashboard/dashboard-overview',
                    id: '',
                    value: '',
                    datakey: 't-dashboard-overview',
                    t:'t-dashboard-overview',
                    list: [],
                },
                {
                    link: '/dashboard/dashboard-by-service',
                    id: '',
                    value: '',
                    datakey: 't-dashboard-by-service',
                    t:'t-dashboard-by-service',
                    list: [],
                },
                {
                    link: '/dashboard/dashboard-by-contract',
                    id: '',
                    value: '',
                    datakey: 't-dashboard-by-contract',
                    t:'t-dashboard-by-contract',
                    list: [],
                },
              
            ]
        }
    ]
}