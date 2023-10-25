import React from 'react';

export class Loader extends React.Component {
  render() {
    return (
      <div className="mt-4 space-y-2 rounded-lg bg-white px-2 py-3 text-black shadow-md sm:px-4">
        Loading...
      </div>
    );
  }
}
