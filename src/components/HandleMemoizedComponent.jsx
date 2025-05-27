import {useRef, useState } from "react";

export default function MemoizedComponent() {

    const num1Ref = useRef(0);
    const num2Ref = useRef(0);
    const [memoList, setMemoList] = useState([]);

    const memoizeSum = useRef((() => {
        const cache = {};

        return (a, b) => {
            const key = `${a},${b}`;
            if (key in cache) {
                setMemoList(prev => [...prev, { key, res: cache[key], status: 'M' }]);
                return cache[key];
            } else {
                const res = a + b;
                cache[key] = res;
                setMemoList(prev => [...prev, { key, res, status: 'N' }]);
                return res;
            }
        };
    })()).current;

    const handleSubmit = (event) => {
        event.preventDefault();
        const a = Number(num1Ref.current.value);
        const b = Number(num2Ref.current.value);

        const res = memoizeSum(a, b);

    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="number" ref={num1Ref} />
                <span>+</span>
                <input type="number" ref={num2Ref} />
                <button type="submit">=</button>
            </form>

            <table>
                <tbody>
                    {memoList.map((element, index) => (
                        <tr key={index}>
                            <td>{element.key}</td>
                            <td>{element.res}</td>
                            <td>{element.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </>
    )
}