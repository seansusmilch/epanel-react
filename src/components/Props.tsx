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