export const chartSimple = {
    offset: {
      x: 0,
      y: 0
    },
    nodes: {
      node1: {
        id: "node1",
        type: "When someone Active on Site",
        position: {
          x: 370,
          y: 100
        },
        ports: {
          port1: {
            id: "port1",
            type: "bottom",
            properties: {
              linkColor: 'rgba(43,152,211,.5)',
            }
          }
        }
      },
      node2: {
        id: "node2",
        type: "End",
        position: {
          x: 500,
          y: 300
        },
        ports: {
          port1: {
            id: "port1",
            type: "top",
            properties: {
              linkColor: '#BAC2CA',
            }
          }
        }
      }
    },
    links: {
      link1: {
        id: "link1",
        from: {
          nodeId: "node1",
          portId: "port1"
        },
        to: {
          nodeId: "node2",
          portId: "port1"
        },
      },
    },
    selected: {},
    hovered: {}
  };