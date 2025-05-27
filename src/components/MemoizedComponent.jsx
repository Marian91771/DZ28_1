import { useEffect, useMemo, useRef, useState } from "react";

export default function MemoizedComponent() {

    const num1Ref = useRef(0);
    const num2Ref = useRef(0);
    const [num1, setNum1] = useState(0);
    const [num2, setNum2] = useState(0);
    const [result, setResult] = useState(0);

    const sum = (a, b) => {
        return a + b;
    }


    const memoizeSum = useMemo(() => {
        return sum(Number(num1), Number(num2));
    }, [num1, num2]);

    useEffect(() => {
        setResult(memoizeSum);
        console.log(memoizeSum);
    }, [memoizeSum]);

    const handleSubmit = (event) => {
        event.preventDefault();
        setNum1(num1Ref.current.value);
        setNum2(num2Ref.current.value);
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="number" ref={num1Ref} />
                <span>+</span>
                <input type="number" ref={num2Ref} />
                <button type="submit">=</button>
            </form>

            <div>
                {result}
            </div>
        </>
    )
}