let email_user_api = [
    {
        text : 'Received emails',
        path : 'email/received',
        ComponentName : 'Received_emails',
        type : 'get',
        SchemaItem : ['email:Array'],
        state : 1
    },
    // {
    //     text : 'Send emails',
    //     path : 'email/send',
    //     ComponentName : 'Send_emails',
    //     type : 'get',
    //  SchemaItem : ['email:Array'],
    //     state : 2
    // },
    // {
    //     text : 'Spam emails',
    //     path : 'email/spam',
    //     ComponentName : 'Spam_emails',
    //     type : 'get',
    //  SchemaItem : ['email:Array'],
    //     state : 3
    // },
    // {
    //     text : 'Trash emails',
    //     path : 'email/trash',
    //     ComponentName : 'Trash_emails',
    //     type : 'get',
    //  SchemaItem : ['email:Array'],
    //     state : 4
    // },
]
let email_developer_api = [
    {
        text : 'User stats',
        path : 'email/user',
        ComponentName : 'User_stats',
        type : 'get',
        // SchemaItem : ['email:Array']
        state : 1
    },
    // {
    //     text : 'Request left',
    //     path : 'email/request/left',
    //     ComponentName : 'Request_left',
    //     type : 'get',
    // SchemaItem : ['request_left:Number', 'total_token:Number']
    //     state : 2
    // },
    // {
    //     text : 'General user analytics',
    //     path : 'email/general',
    //     ComponentName : 'General_user_analytics',
    //     type : 'get',
    // SchemaItem : ['most_used:Number', 'criteria:String', 'area:Array']
    //     state : 3
    // },
    // {
    //     text : 'Add user',
    //     path : 'email/add/user',
    //     ComponentName : 'Add_user',
    //     type : 'post',
    // SchemaItem : ['email:Array']
    //     state : 4
    // },
    // {
    //     text : 'Delete user',
    //     path : 'email/delete/user',
    //     ComponentName : 'Delete_user',
    //     type : 'post',
    // SchemaItem : ['email:Array']
    //     state : 5
    // },
    // {
    //     text : 'Update user',
    //     path : 'email/update/user',
    //     ComponentName : 'Update_user',
    //     type : 'post',
    // SchemaItem : ['email:Array']
    //     state : 6
    // },
]

export {email_user_api, email_developer_api}