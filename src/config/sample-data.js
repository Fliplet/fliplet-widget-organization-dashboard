const sampleData = {
  appSessions: [{
    count: 78
  }, {
    count: 88
  }, {
    count: 164
  }, {
    count: 107
  }, {
    count: 93
  }, {
    count: 103
  }, {
    count: 186
  }, {
    count: 165
  }, {
    count: 175
  }, {
    count: 147
  }, {
    count: 103
  }, {
    count: 99
  }, {
    count: 126
  }, {
    count: 208
  }, {
    count: 197
  }, {
    count: 235
  }, {
    count: 219
  }, {
    count: 112
  }, {
    count: 98
  }, {
    count: 169
  }, {
    count: 161
  }, {
    count: 151
  }, {
    count: 181
  }, {
    count: 169
  }, {
    count: 117
  }, {
    count: 94
  }, {
    count: 198
  }, {
    count: 243
  }, {
    count: 203
  }, {
    count: 267
  }, {
    count: 150
  }],
  studioSessions: [{
    count: 15
  }, {
    count: 12
  }, {
    count: 14
  }, {
    count: 21
  }, {
    count: 24
  }, {
    count: 17
  }, {
    count: 13
  }, {
    count: 15
  }, {
    count: 28
  }, {
    count: 22
  }, {
    count: 37
  }, {
    count: 7
  }, {
    count: 8
  }, {
    count: 11
  }, {
    count: 12
  }, {
    count: 10
  }, {
    count: 32
  }, {
    count: 23
  }, {
    count: 20
  }, {
    count: 18
  }, {
    count: 15
  }, {
    count: 7
  }, {
    count: 6
  }, {
    count: 10
  }, {
    count: 12
  }, {
    count: 14
  }, {
    count: 24
  }, {
    count: 20
  }, {
    count: 27
  }, {
    count: 36
  }, {
    count: 10
  }],
  stats: {
    uniqueAppUsers: {
      count: 50,
      previousPeriodCount: 35
    },
    totalAppUsers: {
      count: 60,
      previousPeriodCount: 40
    },
    appSessions: {
      count: 4913,
      previousPeriodCount: 5000
    },
    studioSessions: {
      count: 430,
      previousPeriodCount: 500
    },
    studioUsers: {
      count: 2,
      previousPeriodCount: 1
    },
    newStudioUsers: {
      count: 1,
      previousPeriodCount: 0
    },
    appsCreated: {
      count: 2,
      previousPeriodCount: 1
    },
    appsEdited: {
      count: 1,
      previousPeriodCount: 1
    },
    appsPublished: {
      count: 1,
      previousPeriodCount: 0
    }
  },
  apps: [{
    id: 1,
    name: 'First app',
    createdAt: moment().subtract(15, 'days').utc().format(),
    updatedAt: moment().subtract(12, 'days').utc().format(),
    publishedAt: moment().subtract(5, 'days').utc().format(),
    publishedAppleAt: null,
    publishedGoogleAt: null,
    publishedWebAt: moment().subtract(5, 'days').utc().format(),
    stats: {
      users: {
        count: 50,
        previousPeriodCount: 35
      },
      sessions: {
        count: 3500,
        previousPeriodCount: 4000
      },
      devices: {
        count: 60,
        previousPeriodCount: 40
      },
      updates: {
        count: 4,
        previousPeriodCount: 2
      },
      publishes: {
        count: 2,
        previousPeriodCount: 1
      }
    }
  }, {
    id: 2,
    name: 'Second app',
    createdAt: moment().subtract(5, 'days').utc().format(),
    updatedAt: moment().subtract(2, 'days').utc().format(),
    publishedAt: null,
    publishedAppleAt: null,
    publishedGoogleAt: null,
    publishedWebAt: null,
    stats: {
      users: {
        count: 0,
        previousPeriodCount: 0
      },
      sessions: {
        count: 0,
        previousPeriodCount: 0
      },
      devices: {
        count: 0,
        previousPeriodCount: 0
      },
      updates: {
        count: 0,
        previousPeriodCount: 0
      },
      publishes: {
        count: 0,
        previousPeriodCount: 0
      }
    }
  }],
  users: [{
    id: 2,
    email: 'user-2@fliplet.com',
    lastSeenAt: moment().subtract(1, 'days').utc().format(),
    createdAt: moment().subtract(16, 'days').utc().format(),
    stats: {
      studioSessions: {
        count: 250
      },
      viewerSessions: {
        count: 2
      },
      appPublishes: {
        count: 1
      },
      appsAvailable: {
        count: 1
      },
      appsCreated: {
        count: 0
      }
    }
  }, {
    id: 1,
    email: 'user-2@fliplet.com',
    lastSeenAt: moment().subtract(2, 'days').utc().format(),
    createdAt: moment().subtract(5, 'days').utc().format(),
    stats: {
      studioSessions: {
        count: 400
      },
      viewerSessions: {
        count: 5
      },
      appPublishes: {
        count: 1
      },
      appsAvailable: {
        count: 2
      },
      appsCreated: {
        count: 2
      }
    }
  }]
};


function addSampleDates(data) {
  for (let i = 0; i < data.length; i++) {
    const subtractDayIndex = i + 1;

    if (i === data.length) {
      data[i].day = moment().format('YYYY-MM-DD');
    } else {
      data[i].day = moment().subtract(data.length - subtractDayIndex, 'days').format('YYYY-MM-DD');
    }
  }

  return data;
}

sampleData.appSessions = addSampleDates(sampleData.appSessions);
sampleData.studioSessions = addSampleDates(sampleData.studioSessions);

export default sampleData;
