import React from 'react'

interface Props{

}

export const InviteInfo:React.FC<Props> = (props) => {
    return(
        
        <div className='card rounded bg-dark mb-3'>

            <div className='card-header text-center'>
                <h5>Some Info</h5>
            </div>
            <div className='card-body'>
                <div className='jumbotron bg-secondary'>
                    <h6>Coming soon
                    </h6>
                </div>
                {/* <div className='jumbotron bg-secondary'>
                    <h6>This is where information regarging invites and other emby server stuff will go. Maybe have some of this info appear on the home page docs aswell?
                        Idk how much info will be here. Maybe ill even make a separate markdown file for this section. That would be cool.
                    </h6>
                </div>
                <div className='jumbotron bg-secondary'>
                    <h6>This is where information regarging invites and other emby server stuff will go. Maybe have some of this info appear on the home page docs aswell?
                        Idk how much info will be here. Maybe ill even make a separate markdown file for this section. That would be cool.
                    </h6>
                </div>
                <div className='jumbotron bg-secondary'>
                    <h6>This is where information regarging invites and other emby server stuff will go. Maybe have some of this info appear on the home page docs aswell?
                        Idk how much info will be here. Maybe ill even make a separate markdown file for this section. That would be cool.
                    </h6>
                </div> */}
            </div>
        </div>
        
    )
}