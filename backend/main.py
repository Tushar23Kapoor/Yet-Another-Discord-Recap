import orjson
import os
import sys
import zipfile

class UserDetailsExtractor:
    UserDataJson = None

    @staticmethod
    def getAvatar(sentpath):
        if sentpath == "-1":
            path = os.path.join(os.getcwd(), "data", "Account", "user.json")
        else:
            path = os.path.join(os.path.abspath(os.path.join(sentpath, "../data")), "Account", "user.json")
        with open(path, "rb") as f:
            UserDetailsExtractor.UserDataJson = orjson.loads(f.read())
        print("{\"avatarUrl\" : \"https://cdn.discordapp.com/avatars/" + UserDetailsExtractor.UserDataJson.get("id") + "/" + UserDetailsExtractor.UserDataJson.get("avatar_hash")+".png\","
               "\"userName\" : \"" + UserDetailsExtractor.UserDataJson.get("username") + "\"}")


class DataPacketHandler:
    
    @staticmethod
    def extractPacket(filePath):
        with zipfile.ZipFile(filePath, "r") as zip:
                zip.extractall(os.path.abspath(os.path.join(os.getcwd(), "../data")))
        print("{\"result\" : \"Files Extracted.\"}")


def main():
    command = sys.argv[1]

    if command == "avatar":
        result = UserDetailsExtractor.getAvatar(sys.argv[2])

    elif command == "unzip":
        DataPacketHandler.extractPacket(sys.argv[2])

    else:
        result = {"status": "error", "message": "Unknown command"}



if __name__ == "__main__":
    main()