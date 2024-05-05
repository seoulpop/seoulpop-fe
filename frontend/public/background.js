addEventListener('fetchGeolocation', async (resolve, reject) => {
  try {
    const { value } = CapacitorKV.get('CHECKINS');
    const time = new Date().getTime();
    const location = await CapacitorGeolocation.getCurrentLocation();
    
    // const response = await fetch(``);
    // if (!response.ok) {
    //   throw new Error('Could not fetch ping');
    // }
    // const result = await response.data;

    // let scheduleDate = new Date();
    // scheduleDate.setSeconds(scheduleDate.getSeconds() + 5);

    // CapacitorNotifications.schedule([
    //   {
    //     id: 42,
    //     title: 'Background Magic',
    //     body: result,
    //     scheduleAt: scheduleDate,
    //   },
    // ]);

    let checkinArr = [{ location, time }];

    try {
      const parsedArr = JSON.parse(value);
      checkinArr = [...parsedArr, { location, time }];
    } catch (e) {
      console.log('no checkins');
    }

    console.log(checkinArr);
    CapacitorKV.set('CHECKINS', JSON.stringify(checkinArr));
    console.log('checkin saved');

    resolve();
  } catch (error) {
    reject(error);
  }
});

addEventListener('loadCheckins', (resolve, reject) => {
  try {
    const { value } = CapacitorKV.get('CHECKINS');

    try {
      const arr = JSON.parse(value);
      resolve(arr);
    } catch (e) {
      resolve([]);
    }
  } catch (error) {
    console.error(error);
    reject([]);
  }
});
