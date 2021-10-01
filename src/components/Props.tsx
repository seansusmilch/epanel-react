import firebase from 'firebase'

export interface StatusProps {
    auto: {
        down_col: string
        down_msg: string
        up_col: string
        up_msg: string
        enabled: boolean
    }
    current: {
        announcement: string
        status_col: string
        status_msg: string
    }
    lastUpdated: {
        auto: boolean
        time: number
    }
}

export interface NewStatus {
    announcement: string
    auto: boolean
    down_col: string
    down_msg: string
    status_col: string
    status_msg: string
    up_col: string
    up_msg: string
}

export interface InviteUse {
    emby_user:{
        connect: string,
        err: any,
        id: string,
        password: string,
        success: boolean,
        username: string
    },

    id: string,
    invite_id: string,
    used_at: Date,
    
    used_by: {
        email: string,
        name: string,
        picture: string,
        uid: string
    }
}

export interface Invite {
    code: string
    created_at: Date | firebase.firestore.Timestamp   // remember to convert these to FirebaseFirestore.Timestamps
    expires_at: Date | firebase.firestore.Timestamp   // or firestore.Timestamp
    id: string
    uses_left: number
}