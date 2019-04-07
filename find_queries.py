import re
from os import system
file_names = [
	"./routes/booking-router.js",
	"./routes/calendar-router.js",
	"./routes/customer-router.js",
	"./routes/employee-router.js",
	"./routes/hotel-chain-router.js",
	"./routes/hotel-router.js",
	"./routes/rental-router.js",
	"./routes/room-router.js",
	"./services/address-service.js",
	"./services/booking-service.js",
	"./services/employee-service.js",
	"./services/hotel-service.js",
	"./services/room-service.js",
	"./sql-scripts/insert-sample-data.js"
]

if __name__ == '__main__':
	for file_name in file_names:
		with open(file_name) as file:
			file_content = file.read()
			groups = re.findall("(\.query\((\s|\n)*?((`[\s\S]*?`)|(\".*\")|('.*')),?)", file_content, re.M)
			print "\n", file_name
			for match in groups:
				item = match[0]
				for line in item.split("\n"):
					print "\t", line
			