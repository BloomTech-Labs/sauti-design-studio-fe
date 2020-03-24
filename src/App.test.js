import React from 'react'
import { Provider } from "react-redux";

// HEADS UP !!!!!
// React Test Renderer CAN NOT, repeat CAN NOT, 'currently'  work
// with eslint higher than 5.16.0, and jest 24.7.1
// so leave them alone if you like tests running

// test('Fake Test', () => {
//   expect(true).toBeTruthy();
// })

describe('<Navbar />', () => {
  it('should render', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    );
    expect(getByText(/SAUTI DESIGN STUDIO/i)).toBeInTheDocument();
  });
})
