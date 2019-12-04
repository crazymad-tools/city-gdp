export default {
  namespace: 'earth-tooltip',
  state: {
    tooltips: []
  },
  reducers: {
    update(state: any, { payload: { tooltips } }: any) {
      return {
        ...state, tooltips
      }
    },
    add(state: any, { payload: { tooltip } }: any) {
      let tooltips = state.tooltips;
      tooltips.concat([tooltip]);

      return { ...state, tooltips }
    }
  }
}
