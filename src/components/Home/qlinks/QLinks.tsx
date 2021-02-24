import React from 'react'
import './qlinks.sass'

interface Props {
    isLoggedIn: boolean
    isAdmin: boolean

}

export const QLinks: React.FC<Props> = (props:Props)=>{
    return (
        <div className='mr-auto ml-auto bg-dark p-1 rounded' id='qlinks'>
            <div className='mr-auto ml-auto' id='qlinks-title'>
                <a href="https://dl.minecraftsexy.website">Q</a>uick Links
            </div>

            <div className="d-flex justify-content-center flex-lg-nowrap">

                <div className="p-2">
                    <a href="http://app.emby.media/#!/home" title='Emby'>
                        <img src={'./logos/emby-icon.webp'} className="qlink" alt=""/>
                    </a>
                </div>
                <div className="p-2">
                    <a href="/ombi" title='Ombi'>
                        <img src={'./logos/ombi-icon.webp'} className="qlink" alt=""/>
                    </a>
                </div>

                {props.isLoggedIn && props.isAdmin ? 

                    <div className="dropdown">
                        <div className="btn-group dropup">
                            <button type="button" className="btn dropdown-toggle p-2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <img src={'./logos/rutorrent-icon.webp'} className="qlink" alt=""/>
                            </button>
                            <div className="dropdown-menu bg-dark slideIn rounded" id="qlink-drop">
                                <a href="/rutorrent" className="dropdown-item p-2">
                                    <img src={'./logos/rutorrent-icon.webp'} className="qlink" alt=""/>
                                </a>
                                <a href="https://gaming.minecraftsexy.website/jackett" className="dropdown-item p-2">
                                    <img src={'./logos/jackett-icon.webp'} className="qlink" alt=""/>
                                </a>
                                <a href="https://gaming.minecraftsexy.website/radarr" className="dropdown-item p-2">
                                    <img src={'./logos/radarr-icon.webp'} className="qlink" alt=""/>
                                </a>
                                <a href="https://gaming.minecraftsexy.website/sonarr" className="dropdown-item p-2">
                                    <img src={'./logos/sonarr-icon.webp'} className="qlink" alt=""/>
                                </a>
                            </div>
                        </div>
                    </div>

                    :
                    <div className="p-2">
                        <a href="https://discord.gg/PBP7jqV" title='Discord'>
                            <img src={'./logos/discord-icon.webp'} className="qlink" alt=""/>
                        </a>
                    </div>
                }

            </div>
        </div>
    )
}