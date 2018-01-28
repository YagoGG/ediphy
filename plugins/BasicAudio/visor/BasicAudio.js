import React from 'react';

export function BasicAudio(base) {
    return {
        getRenderTemplate: function(state) {
            return (
                <div style={{ height: '100%', width: '100%' }} className='dropableRichZone'>
                    <audio className='basicAudioClass'
                        src={ state.url }
                        autoPlay={ state.autoplay }
                        controls={ state.controls }
                        loop= { state.loop }
                        muted={ state.muted } />
                </div>
            );
        },
    };
}
