import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();

if (envFound.error) {

  throw new Error("Couldn't find .env file");
}

export default{

	server:{

		port: 3001
	},

	assets:{

		build: "../../web/build/"
	},

	roles:{

		guest:0,
		videohost:1,
		admin:2,
		creator:3,
		employee:4
	},

	api:{

		prefix_v1: "/api/v1"
	},

	mongodb:{

		mezia:{

			url: "mongodb://localhost:27017/mezia",
			name: "mezia"
		}
	}
};