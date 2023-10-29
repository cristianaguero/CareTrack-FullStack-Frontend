
function Header({ text, span }) {
    return (
        <div>
            <h1 className="text-indigo-600 font-black text-6xl">
                    {text} {' '}
                    <span className="text-black">{span}</span>
                </h1>

        </div>
    )
}

export default Header