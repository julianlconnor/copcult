define({
  valid: {
    data: {
      id: 'foo',
      key: 'bar',
      story: {
        actor: {
          profile_picture: "https://graph.facebook.com/100003850208660/picture?type=large",
          name: "Andrew Kortina"
        },
        note: "one of us built a cool way to test payment emails.  Staub just enhanced it.  Good stuff.",
        amount: "4.20",
        target: {
          phone: '12015320947'
        }
      }
    }
  },

  claimed: {
    data: {
      id: 'foo',
      key: 'bar',
      story: {
        actor: {
          profile_picture: "https://graph.facebook.com/100003850208660/picture?type=large",
          name: "Andrew Kortina"
        },
        note: "one of us built a cool way to test payment emails.  Staub just enhanced it.  Good stuff.",
        amount: "4.20",
        target: {
          phone: '12015320947'
        }
      },
      completed: true,
      claimed: true,
    }
  },

  expired: {
    data: {
      id: 'foo',
      key: 'bar',
      story: {
        actor: {
          profile_picture: "https://graph.facebook.com/100003850208660/picture?type=large",
          name: "Andrew Kortina"
        },
        note: "one of us built a cool way to test payment emails.  Staub just enhanced it.  Good stuff.",
        amount: "4.20",
        target: {
          phone: '12015320947'
        }
      },
      completed: true,
      claimed: false,
      status_code: 4,
      status_message: 'Expired'
    }
  }
});
