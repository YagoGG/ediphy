import React from 'react';
import i18n from 'i18next';

export function BasicAudio(base) {
    return {
        getConfig: function() {
            return {
                name: 'BasicAudio',
                displayName: i18n.t('BasicAudio.PluginName'),
                category: 'multimedia',
                flavor: 'react',
                needsConfigModal: false,
                needsTextEdition: false,
                initialWidth: '500px',
                initialHeight: '32px',
                initialWidthSlide: '30%',
                initialHeightSlide: '30%',
                icon: 'music_note',
            };
        },
        getToolbar: function() {
            return {
                main: {
                    __name: 'Main',
                    accordions: {
                        basic: {
                            __name: Ediphy.i18n.t('BasicAudio.Audio'),
                            icon: 'link',
                            buttons: {
                                url: {
                                    __name: Ediphy.i18n.t('BasicAudio.URL'),
                                    type: 'text',
                                    value: base.getState().url,
                                    autoManaged: false,
                                },
                                autoplay: {
                                    __name: Ediphy.i18n.t('BasicAudio.Autoplay'),
                                    type: 'checkbox',
                                    checked: base.getState().autoplay,
                                    autoManaged: false,
                                },
                                controls: {
                                    __name: Ediphy.i18n.t('BasicAudio.Show_controls'),
                                    type: 'checkbox',
                                    checked: base.getState().controls,
                                    autoManaged: false,
                                },
                                loop: {
                                    __name: Ediphy.i18n.t('BasicAudio.Play_in_loop'),
                                    type: 'checkbox',
                                    checked: base.getState().loop,
                                    autoManaged: false,
                                },
                                muted: {
                                    __name: Ediphy.i18n.t('BasicAudio.Mute'),
                                    type: 'checkbox',
                                    checked: base.getState().muted,
                                    autoManaged: false,
                                },
                            },
                        },
                    },
                },
            };
        },
        getInitialState: function() {
            return {
                url: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Bongo_sound.wav',
                autoplay: false,
                controls: true,
                loop: false,
                muted: false,
            };
        },
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
        handleToolbar: function(name, value) {
            base.setState(name, value);
        },
    };
}
