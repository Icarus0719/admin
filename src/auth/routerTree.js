    // 侧边栏，面包屑等路由内容的树形数据结构
    import i18n from 'assets/lang'

    function AdminPath() {
        this.data = [{
                title: i18n.t('Aside.Board'),
                path: "/board",
                icon: "el-icon-notebook-1",
                children: []
            },
            {
                title: i18n.t('Aside.Lease'),
                path: "/lease",
                icon: "el-icon-document",
                children: [{
                    title: i18n.t('Aside.Application'),
                    path: "/lease/apply",
                    children: [{
                        title: "",
                        path: "/apply/add",
                    }, {
                        title: "",
                        path: "/apply/edit",
                    }]
                }, {
                    title: i18n.t('Aside.TempDeletion'),
                    path: "/lease/delete",
                }, {
                    title: i18n.t('Aside.AdPayment'),
                    path: "/lease/payment",
                }, {
                    title: i18n.t('Aside.YearApplication'),
                    path: "/lease/yearapply",
                }, {
                    title: i18n.t('Aside.Sales'),
                    path: "/lease/static",
                }]
            },
            {
                title: i18n.t('Aside.Leader'),
                path: "/leader",
                icon: "el-icon-money",
                children: [{
                    title: i18n.t('Aside.L_lease'),
                    path: "/leader/case",
                }, {
                    title: i18n.t('Aside.L_adPayment'),
                    path: "/leader/payment",
                }, {
                    title: i18n.t('Aside.L_sales'),
                    path: "/leader/static",
                }]
            },
            {
                title: i18n.t('Aside.Manager'),
                path: "/manager",
                icon: "el-icon-coin",
                children: [{
                    title: i18n.t('Aside.M_lease'),
                    path: "/manager/case",
                }, {
                    title: i18n.t('Aside.M_adPayment'),
                    path: "/manager/payment",
                }, {
                    title: i18n.t('Aside.M_sales'),
                    path: "/manager/static",
                }]
            },
            {
                title: i18n.t('Aside.Company'),
                path: "/company",
                icon: "el-icon-office-building",
                children: [{
                    title: i18n.t('Aside.Co_lease'),
                    path: "/company/case",
                }, {
                    title: i18n.t('Aside.Co_adPayment'),
                    path: "/company/payment",
                }, {
                    title: i18n.t('Aside.Co_sales'),
                    path: "/company/static",
                }]
            },
            {
                title: i18n.t('Aside.Affair'),
                path: "/affair",
                icon: "el-icon-school",
                children: [{
                    title: i18n.t('Aside.AF_all'),
                    path: "/affair/all",
                }, {
                    title: i18n.t('Aside.AF_adPayment'),
                    path: "/affair/payment",
                }, {
                    title: i18n.t('Aside.AF_fail'),
                    path: "/affair/fail",
                }, {
                    title: i18n.t('Aside.AF_delete'),
                    path: "/affair/delete",
                }, {
                    title: i18n.t('Aside.AF_finished'),
                    path: "/affair/finished",
                }]
            },
            {
                title: i18n.t('Aside.Financial'),
                path: "/financial",
                icon: "el-icon-set-up",
                children: [{
                    title: i18n.t('Aside.F_unpay'),
                    path: "/financial/unpay",
                }, {
                    title: i18n.t('Aside.F_pay'),
                    path: "/financial/pay",
                }]
            },
            {
                title: i18n.t('Aside.SysCenter'),
                path: "/system",
                icon: "el-icon-user",
                children: [{
                        title: i18n.t('Aside.S_account'),
                        path: "/account",
                        children: [{
                            title: i18n.t('Account.add'),
                            path: "/account/add",
                        }, {
                            title: i18n.t('Account.edit'),
                            path: "/account/edit",
                        }]
                    }, {
                        title: i18n.t('Aside.S_role'),
                        path: "/role",
                        children: []
                    }, {
                        title: i18n.t('Aside.S_notice'),
                        path: "/notice",
                        asideFold: true,
                        children: [{
                            title: i18n.t('Notice.add'),
                            path: "/notice/add",
                        }, {
                            title: i18n.t('Notice.edit'),
                            path: "/notice/edit",
                        }]
                    },
                    {
                        title: i18n.t('Aside.S_file'),
                        path: "/filelist",
                        children: []
                    },
                    {
                        title: i18n.t('Aside.S_orderFile'),
                        path: "/orderfilelist",
                        children: []
                    },
                    {
                        title: i18n.t('Aside.S_dept'),
                        path: "/dept",
                        children: []
                    },
                ]
            },

        ]
    }
    export const superAdminPathList = new AdminPath().data

    export const changeLang = () => {
        return new AdminPath().data
    }