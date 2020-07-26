import React, { useRef, useState, useCallback, useEffect } from 'react';
import './iPad.scss';
import { formattedDateTime } from './util';

const IPad = () => {
  let btnRef = useRef(0);
  let inAppRef = useRef(0);
  let screenRef = useRef(0);
  let wallpaperRef = useRef(0);
  let lockScreenRef = useRef(0);
  let dockWrapperRef = useRef(0);
  let iconDivRef = useRef(0);
  let iconImageRef = useRef(0);

  const [lockStatus, setLockStatus] = useState(false);
  const [dateTime, setDateTime] = useState(
    <div>
      <span className='time'>00:00 </span> <span className='meridiem'>AM</span>{' '}
      <br /> Monday, January 1
    </div>
  );

  const getDateTime = useCallback(() => {
    return formattedDateTime();
  }, []);

  useEffect(() => {
    let interval = setInterval(() => {
      setDateTime(getDateTime);
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, [getDateTime]);

  useEffect(() => setTimeout(() => (getRef(screenRef).opacity = 1), 500), []);

  const getRef = (element) => {
    return element.current.style;
  };

  const powerOnOff = () => {
    getRef(inAppRef).bottom = '-8%';
    getRef(inAppRef).pointerEvents = 'none';
    getRef(wallpaperRef).backgroundImage =
      "url('https://assets.codepen.io/2722301/bg.jpg')";
    if (lockStatus) {
      setLockStatus(false);
      getRef(screenRef).opacity = 1;
      getRef(screenRef).pointerEvents = 'all';
      getRef(lockScreenRef).transition =
        'top 800ms ease-in 0s, backdrop-filter 200ms ease-in 0s';
      getRef(dockWrapperRef).transition = 'bottom 400ms ease-in-out 0s';
    } else {
      setLockStatus(true);
      getRef(screenRef).opacity = 0;
      getRef(screenRef).pointerEvents = 'none';
      setTimeout(() => {
        getRef(lockScreenRef).transition = 'none';
        getRef(lockScreenRef).backdropFilter = 'blur(0)';
        getRef(lockScreenRef).top = '0';
        getRef(dockWrapperRef).transition = 'none';
        getRef(dockWrapperRef).bottom = '-20%';
      });
    }
    resetIcons();
  };

  const unlock = () => {
    getRef(lockScreenRef).backdropFilter = 'blur(2vh) brightness(1.2)';
    getRef(lockScreenRef).top = '-110%';
    getRef(dockWrapperRef).bottom = '3%';
  };

  const iconClick = (e) => {
    let x = document.getElementsByClassName('iconDiv');
    for (let i = 0; i < x.length; i++) {
      x[i].style.width = 0;
      x[i].style.height = 0;
      x[i].style.margin = 0;
      x[i].style.pointerEvents = 'none';
      x[i].getElementsByClassName('imgDiv')[0].style.opacity = 0;
    }
    e.target.style.width = 'calc(var(--size) * 1)';
    e.target.style.height = 'calc(var(--size) * .74)';
    e.target.style.marginLeft = 'calc(var(--size) / 35)';
    e.target.style.marginTop = '4px';
    e.target.getElementsByClassName('imgDiv')[0].style.opacity = 1;
    getRef(dockWrapperRef).bottom = 0;
    getRef(inAppRef).setProperty('--color', window.barColor);
    getRef(inAppRef).bottom = '0';
    getRef(inAppRef).pointerEvents = 'all';

    setTimeout(function () {
      getRef(wallpaperRef).backgroundImage = 'none';
      getRef(dockWrapperRef).top = '0';
    }, 500);
  };

  const goHome = () => {
    getRef(inAppRef).bottom = '-8%';
    getRef(inAppRef).pointerEvents = 'none';
    getRef(wallpaperRef).backgroundImage =
      "url('https://assets.codepen.io/2722301/bg.jpg')";
    getRef(dockWrapperRef).bottom = '3%';
    resetIcons();
  };

  const resetIcons = () => {
    getRef(dockWrapperRef).top = 'unset';
    var x = document.getElementsByClassName('iconDiv');
    for (let i = 0; i < x.length; i++) {
      x[i].style.width = 'calc(var(--size) / 20)';
      x[i].style.height = 'calc(var(--size) / 20)';
      x[i].style.margin = 'calc(var(--size) / 60) calc(var(--size) / 120)';
      x[i].style.pointerEvents = 'all';
      x[i].getElementsByClassName('imgDiv')[0].style.opacity = 0;
    }
  };

  return (
    <div className='ipadDiv'>
      <button ref={btnRef} className='powerButton' onClick={powerOnOff}>
        |
      </button>
      <div className='screen' ref={screenRef}>
        <div className='wallpaper' ref={wallpaperRef}>
          <div className='statusBar'></div>
          <div className='dockWrapper' ref={dockWrapperRef}>
            <div className='dockBar'>
              <div
                className='iconDiv'
                ref={iconDivRef}
                onClick={(e) => {
                  window.barColor = 'black';
                  iconClick(e);
                }}
              >
                <div className='imgDiv' ref={iconImageRef}></div>
              </div>
              <div
                className='iconDiv'
                ref={iconDivRef}
                onClick={(e) => {
                  window.barColor = 'white';
                  iconClick(e);
                }}
              >
                <div className='imgDiv' ref={iconImageRef}></div>
              </div>
              <div
                className='iconDiv'
                ref={iconDivRef}
                onClick={(e) => {
                  window.barColor = 'black';
                  iconClick(e);
                }}
              >
                <div className='imgDiv' ref={iconImageRef}></div>
              </div>
              <div className='iconDivider'></div>
              <div
                className='iconDiv'
                ref={iconDivRef}
                onClick={(e) => {
                  window.barColor = 'white';
                  iconClick(e);
                }}
              >
                <div className='imgDiv' ref={iconImageRef}></div>
              </div>
            </div>
          </div>
        </div>
        <div className='lockScreen' ref={lockScreenRef} onClick={unlock}>
          <div className='lockContent'>
            <div className='statusBar'></div>
            <div className='lockIcon'></div>
            <div className='dateTime'>{dateTime}</div>
          </div>
          <div className='interactionBar'></div>
        </div>
        <div
          className='interactionBar'
          ref={inAppRef}
          onClick={goHome}
          id='inAppBar'
        ></div>
      </div>
    </div>
  );
};

export default React.memo(IPad);
