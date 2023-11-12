import Loading from "./Loading";

const LogsSection = ({ handleSearch, searchQuery, setSearchQuery, fetchLogs, logsLoading, logs, logsError, renderLogEntry }) => {
    return (
        <section className="logs-section">
        <h2 className="logs-head">Logs</h2>
        <div className="logs-dashboard">
            <form onSubmit={handleSearch} className="log-search-form">
                <input
                    type="text"
                    placeholder="Search logs..."
                    className="search-logs-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="search-logs-button" type="submit">Search</button>
            </form>

            <div className="logs-button-container">
                <button className="logs-button" onClick={() => fetchLogs()}>All Logs</button>
                <button className="logs-button" onClick={() => fetchLogs('error')}>Error Logs</button>
                <button className="logs-button" onClick={() => fetchLogs('info')}>Info Logs</button>
                <button className="logs-button" onClick={() => fetchLogs('warn')}>Warning Logs</button>
            </div>
        </div>

        <hr className="logs-hr" />

        {logsLoading ? (
            <Loading loading={logsLoading} />
        ) : logsError ? (
            <p className="log-error">Error: {logsError}</p>
        ) : (
            logs && logs.length > 0 ? (
                <div className="logs-display">
                    <ul className="logs-list">
                        {logs.map(log => renderLogEntry(log))}
                    </ul>
                </div>
            ) : (
                <p className="log-msg">
                    Search for logs or click one of the buttons above to view logs.
                </p>
            )
        )}
    </section>
    );
}

export default LogsSection;