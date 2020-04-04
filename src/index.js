import React from 'react';
import ReactDOM from 'react-dom';


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            input: ["", ""],
            result: "No result"
        };

        this.calculate = this.calculate.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }

    onInputChange(e, id) {
        const newValue = e.target.value;
        this.setState((state) => {
            let oldInput = state.input;
            oldInput[id] = newValue;
            return {
                input: oldInput
            };
        });
    }

    calculateResult(input1, input2) {
        let as = input1.split('\n');
        if (as.length < 2) {
            return "Empty the 2nd line of the 1st input";
        }
        let a = as[1];
        let bs = input2.split('\n');
        if (bs.length < 2) {
            return "Empty the 2nd line of the 2nd input";
        }
        let b = bs[1];

        let n = a.length;
        let m = b.length;
        let dp = new Array(n + 1);
        let par = new Array(n + 1);
        for (let i = 0; i <= n; i++) {
            dp[i] = new Array(m + 1);
            dp[i][0] = i;
            par[i] = new Array(m + 1);
            par[i][0] = "vertical";
            for (let j = 0; j <= m; j++) {
                dp[i][j] = +Infinity;
                dp[0][j] = j;
                par[i][j] = "none";
                par[0][j] = "horizontal";
            }

            par[0][0] = "none";
        }

        for (let i = 1; i <= n; i++) {
            for (let j = 1; j <= m; j++) {
                if (dp[i - 1][j] + 1 <= dp[i][j]) {
                    dp[i][j] = dp[i - 1][j] + 1;
                    par[i][j] = "vertical";
                }
                if (dp[i][j - 1] + 1 <= dp[i][j]) {
                    dp[i][j] = dp[i][j - 1] + 1;
                    par[i][j] = "horizontal";
                }
                let cost = a[i] !== b[j];
                if (dp[i - 1][j - 1] + cost <= dp[i][j]) {
                    dp[i][j] = dp[i - 1][j - 1] + cost;
                    par[i][j] = "diagonal";
                }
            }
        }

        let result1 = "";
        let result2 = "";
        let i = n, j = m;
        while (par[i][j] !== "none") {
            if (par[i][j] === "diagonal") {
                i--;
                j--;
                result1 += a[i];
                result2 += b[j];
            }
            else if (par[i][j] === "vertical") {
                i--;
                result1 += a[i];
                result2 += '-';
            }
            else if (par[i][j] === "horizontal") {
                j--;
                result2 += b[j];
                result1 += '-';
            }
            else {
                // eslint-disable-next-line no-throw-literal
                throw "Wrong execution state";
            }
        }

        result1 = result1.split("").reverse().join("");
        result2 = result2.split("").reverse().join("");
        return "".concat(result1, "\n", result2);
    }

    calculate() {
        const result = this.calculateResult(this.state.input[0], this.state.input[1]);
        this.setState({
            result: result
        });
    }

    render() {
        return <div>
            <textarea onChange={(e) => this.onInputChange(e, 0)}/><br/>
            <textarea onChange={(e) => this.onInputChange(e, 1)}/><br/>
            <button onClick={this.calculate}>Calculate</button><br/>
            <pre><label className="display-linebreak">{this.state.result}</label></pre>
        </div>
    }
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

