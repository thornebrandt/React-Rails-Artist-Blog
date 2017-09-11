import React from 'react';
import { connect } from 'react-redux';
import { createMockStore } from 'redux-test-utils';
import configureMockStore from 'redux-mock-store';
import { shallowWithStore } from 'enzyme-redux';
import { shallow } from 'enzyme';
import HelloWorld from '../HelloWorld/components/HelloWorld';
import HelloWorldContainer from '../HelloWorld/containers/HelloWorldContainer';
import reducer from '../HelloWorld/reducers/helloWorldReducer';
import * as actions from '../HelloWorld/actions/helloWorldActionCreators'
import * as types from '../HelloWorld/constants/helloWorldConstants'

function setupHelloWorld () {
	const props = {
		updateName: jest.fn(),
		name: 'defaultName'
	}
	const wrapper = shallow(<HelloWorld { ...props} />);
	return {
		props,
		wrapper
	}
}

describe('HelloWorld', () => {

	describe('hello world component', () => {
		const { wrapper, props } = setupHelloWorld();
		it('displays default value', () => {
			expect(wrapper.find('h3').text()).toEqual('Hello, defaultName!');
		});

		it('calls updateName', () => {
			let inputField = wrapper.find('#helloWorldInput');
			inputField.simulate('change', {target: {value: 'newName'}});
			expect(props.updateName.mock.calls.length).toBe(1);
		});
	});


	describe('hello world actions', () => {
		it('should create a name', () => {
			const name = 'Dude';
			const expectedAction = {
				type: types.HELLO_WORLD_NAME_UPDATE,
				text: name
			};
			expect(actions.updateName(name)).toEqual(expectedAction);
		});
	});

	describe('hello world reducers', () => {
		it('should return the initial state', () => {
			const expectedState = {
				name: ''
			}
			expect(reducer(undefined, {})).toEqual(expectedState);
		});

		it('should handle updateName', () => {
			const newName = 'newName';
			const expectedState = {
				name: newName
			}
			const action = {
				type: types.HELLO_WORLD_NAME_UPDATE,
				text: newName
			}
			expect(reducer(undefined, action)).toEqual(expectedState);
		});


		it('should update an existing name', () => {
			const newName = 'thirdName';
			const expectedState = {
				name: newName
			}
			const action = {
				type: types.HELLO_WORLD_NAME_UPDATE,
				text: newName
			}
			expect(reducer({ name: 'exiting'}, action)).toEqual(expectedState);
		});
	});

	describe('hello world integration, BROKEN', () => {
		let wrapper, Container, inputField, helloComponent;

		beforeEach(() => {
			let initialState = {
				name: "Stranger"
			};
			wrapper = shallowWithStore(< HelloWorldContainer />, createMockStore(initialState));
			inputField = wrapper.dive().find('#helloWorldInput');
		});

		it('shows diff between dive and fined', () => {
			expect(wrapper.dive().html()).toEqual(wrapper.html());
		});

		it('passes state to hello world component', () => {
			expect(wrapper.props().name).toBe("Stranger");
		});

		it('displays the state variable', () => {
			expect(wrapper.dive().find('h3').text()).toEqual('Hello, Stranger!');
		});

		it('gets the input value', () => {
			expect(inputField.node.props.value).toEqual('Stranger');
		});

		it('updates the input field', () => {
			inputField.simulate('change', {target: {value: 'Man'}});
			inputField.value = 'Man';
			inputField.props().onChange({ target: { value: 'Man' }});
			//expect(inputField.node.props.value).toEqual('Man');
		});
	});
});

describe('redux w/ Store', () => {	
	describe('dummy react component', () => {
		it('works', () => {
			const DummyReactComponent = () => (<div>dummy component</div>);
			const expectedState = { testState: 'expectedState' };
			const mapStateToProps = (state) => state;
			const ConnectedComponent = connect(mapStateToProps)(DummyReactComponent);
			const component = shallowWithStore(< ConnectedComponent />, createMockStore(expectedState));
			expect(component.props().testState).toBe(expectedState.testState);
		});
	});

	describe('dummy dispatch', () => {
		it('works', () => {
			const DummyReactComponent = () => (<div>dummy component</div>);
		  const action = {
				type: 'type'
		  };
		  const mapDispatchToProps = (dispatch) => ({
			dispatchProp() {
			  dispatch(action);
			},
		  });
		  const store = createMockStore();

		  const ConnectedComponent = connect(undefined, mapDispatchToProps)(DummyReactComponent);
		  const component = shallowWithStore(<ConnectedComponent />, store);
		  component.props().dispatchProp();
		  expect(store.isActionDispatched(action)).toBe(true);
		});
	});
});
