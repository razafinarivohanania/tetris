'use strict';

(() => {
    window.tetris.options = {
        box : {
            size : 25,
            type : {
                plus : {
                    color : {
                        light : '#23D373',//green
                        dark : '#14BA5F'
                    }
                },
                square : {
                    color : {
                        light : '#6E3FDB',//blue
                        dark : '#4D23AF'
                    }
                },
                l : {
                    color : {
                        light : '#77757C',//grey,
                        dark : '#595660'
                    }
                },
                z : {
                    color : {
                        light : '#4FD1D1',//cyan
                        dark : '#2DA8A8'
                    }
                },
                i : {
                    color : {
                        light : '#E59824',//orange
                        dark : '#BF7A13'
                    }
                }
            }
        },
        platform : {
            box : {
                count : {
                    horizontal : 11,
                    vertical : 25
                }
            },
            background : {
                color : {
                    light : '#DEDEED',
                    dark : '#CCCCE2'
                }
            }
        },
        color : {
            grey : {
                light : '#DEDEED',
                dark : '#CCCCE2'
            },
            green : {
                light : '#23D373',
                dark : '#14BA5F'
            },
            blue : {
                light : '#6E3FDB',
                dark : '#4D23AF'
            },
            cyan : {
                light : '#4FD1D1',
                dark : ''
            }
        }
    }
})();