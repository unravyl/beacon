const Spinner = () => {
    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-[#8ecae6] opacity-100"></div>
        </div>
    );
}

export default Spinner;
