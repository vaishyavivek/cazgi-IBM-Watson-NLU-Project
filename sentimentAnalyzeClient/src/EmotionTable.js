import React from 'react';
import './bootstrap.min.css';

class EmotionTable extends React.Component {
  render() {
    return (
      <div>
        <table className="table table-bordered">
          <tbody>
            {
              Object.entries(this.props.emotions).map((entry) => {
                return (
                  <tr>
                    <td>{entry[0]}</td>
                    <td>{Number(parseFloat(entry[1])).toLocaleString(undefined, { style: 'percent', minimumFractionDigits: 2 })}</td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    );
  }

}
export default EmotionTable;
