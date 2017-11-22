import { testState } from '../../core/store/state.tests.js';
import nav_items_ids from '../nav_items_ids';
import * as ActionTypes from '../../common/actions';

const initstate = testState;

describe('# nav_items_ids reducer', ()=>{
    describe('DEFAULT', ()=>{
        test('should return testState as initial state', () => {
            expect(nav_items_ids(initstate, {})).toEqual(initstate);
        });
    });
    describe('handle ADD_NAV_ITEM', ()=> {

        test('If Added navigation item', () => {
            const state = initstate.present.navItemsIds;
            const action = { type: ActionTypes.ADD_NAV_ITEM, payload: { position: 7, id: 'pa-1511364505230' } };
            const addId = state.slice();
            addId.splice(action.payload.position, 0, action.payload.id);

            expect(nav_items_ids(state, action)).toEqual(addId);
        });
    });
    describe('handle DELETE_NAV_ITEM ******************** TODO :)', ()=> {
        test('Delete navigation items ', () => {
            const action = { type: ActionTypes.DELETE_NAV_ITEM, payload: { ids: [0, 1] } };
            // expect(action.payload.ids && action.payload.ids.length > 0 && action.payload.ids.includes(0)).toBeTruthy();
            // expect(nav_items_ids(undefined, action)).toEqual(0);
        });
    });

    describe('handle REORDER_NAV_ITEM', ()=> {
        test('Select navigation item', () => {
            const action = { type: ActionTypes.REORDER_NAV_ITEM, payload: { idsInOrder: ['se-1467887497411', 'pa-1497983247795', 'pa-1511370969917'] } };
            expect(nav_items_ids(initstate, action)).toEqual(action.payload.idsInOrder);

        });
    });

    describe('handle IMPORT_STATE', ()=> {
        test('Import navItemSelected from state.test', () => {
            const state = initstate.present.navItemsIds;
            const action = { type: ActionTypes.IMPORT_STATE, payload: { present: { navItemsIds: state } } };
            expect(nav_items_ids(state, action)).toEqual(action.payload.present.navItemsIds);
        });
        test('Import default state', () => {
            const state = 0;
            const action = { type: ActionTypes.IMPORT_STATE, payload: { present: { navItemSelected: state } } };
            expect(nav_items_ids(state, action)).toEqual(state);
        });
    });
});

// case DELETE_NAV_ITEM:
//     return state.filter(id => action.payload.ids.indexOf(id) === -1);

