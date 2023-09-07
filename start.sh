
label_output() {
    local label="$1"
    while IFS= read -r line; do
        echo "$label: $line"
    done
}

(cd client && ./client 2>&1) | label_output "CLIENT" &

(cd Query-UI && PORT=3006 npm run dev 2>&1) | label_output "NPM" &

# Check if Windows
is_windows() {
    [[ "$(uname -r)" =~ Microsoft || "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" || "$OSTYPE" == "win32" ]]
}

# Handle script termination and kill processes on port 3001
cleanup() {
    if is_windows; then
        # Windows command to get the PID by port and then terminate it.
        local pid=$(netstat -ano | findstr "3001" | awk '{print $5}' | head -n 1)
        if [ -n "$pid" ]; then
            taskkill //PID $pid //F
        fi
    else
        # Unix/Linux command to get the PID by port and then terminate it.
        local pid=$(lsof -ti :3001)
        if [ -n "$pid" ]; then
            kill $pid 2>/dev/null
        fi
    fi
}
trap cleanup EXIT INT TERM

wait