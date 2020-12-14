import React from 'react'
import './qlinks.css'

interface Props {
    isLoggedIn: boolean
    isAdmin: boolean

}

export const QLinks: React.FC<Props> = (props:Props)=>{
    return (
        <div className='mr-auto ml-auto bg-dark p-1' id='qlinks'>
            <h5 className='mr-auto ml-auto'>
                <a href="https://dl.minecraftsexy.website">Q</a>uick Links
            </h5>

            <div className="d-flex justify-content-center flex-lg-nowrap">

                <div className="p-2">
                    <a href="http://app.emby.media/#!/home">
                        <img src={'./logos/emby-icon.png'} className="qlink" alt=""/>
                    </a>
                </div>
                <div className="p-2">
                    <a href="https://minecraftsexy.website/ombi">
                        <img src={'./logos/ombi-icon.png'} className="qlink" alt=""/>
                    </a>
                </div>

                {props.isLoggedIn && props.isAdmin ? 

                    <div className="dropdown show">
                        <div className="btn-group dropup">
                            <button type="button" className="btn dropdown-toggle p-2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <img src={'./logos/rutorrent-icon.png'} className="qlink" alt=""/>
                            </button>
                            <div className="dropdown-menu bg-dark" id="qlink-drop">
                                <a href="https://gaming.minecraftsexy.website/rutorrent" className="dropdown-item p-2">
                                    <img src={'./logos/rutorrent-icon.png'} className="qlink" alt=""/>
                                </a>
                                <a href="https://gaming.minecraftsexy.website/jackett" className="dropdown-item p-2">
                                    <img src={'./logos/jackett-icon.png'} className="qlink" alt=""/>
                                </a>
                                <a href="https://gaming.minecraftsexy.website/radarr" className="dropdown-item p-2">
                                    <img src={'./logos/radarr-icon.png'} className="qlink" alt=""/>
                                </a>
                                <a href="https://gaming.minecraftsexy.website/sonarr" className="dropdown-item p-2">
                                    <img src={'./logos/sonarr-icon.png'} className="qlink" alt=""/>
                                </a>
                            </div>
                        </div>
                    </div>

                    :
                    <div className="p-2">
                        <a href="https://discord.gg/PBP7jqV">
                            <img src={'./logos/discord-icon.png'} className="qlink" alt=""/>
                        </a>
                    </div>
                }

            </div>
        </div>
    )
}