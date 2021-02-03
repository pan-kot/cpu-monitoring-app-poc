cores=$(sysctl -n hw.ncpu)
uptime=$(uptime | awk '{print $(NF - 2)}')

normalized_uptime=$(echo "scale=2 ; $uptime / $cores" | bc)

echo "1m average uptime is $normalized_uptime"