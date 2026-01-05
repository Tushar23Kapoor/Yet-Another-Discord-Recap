import orjson
import os
import sys
import zipfile

class UserDetailsExtractor:
    UserDataJson = None

    @staticmethod
    def parseUserJson():
        path = os.path.join(os.getcwd(), "data", "Account", "user.json")
        with open(path, "rb") as f:
            UserDetailsExtractor.UserDataJson = orjson.loads(f.read())
        return {"status": "ok", "message": "User JSON parsed"}

    @staticmethod
    def getAvatar():
        if UserDetailsExtractor.UserDataJson is None:
            return {"status": "error", "message": "User data not loaded"}
        return {"status": "ok", "avatar": UserDetailsExtractor.UserDataJson.get("avatar")}


class DataPacketHandler:
    
    @staticmethod
    def extractPacket(filePath):
        print("Attempting to extract the files.")
        with zipfile.ZipFile(filePath, "r") as zip:
                zip.extractall(os.getcwd() + "\\data")
        print("Files Extracted.")


def main():
    command = sys.argv[1]

    if command == "parse":
        result = UserDetailsExtractor.parseUserJson()

    elif command == "avatar":
        UserDetailsExtractor.parseUserJson()
        result = UserDetailsExtractor.getAvatar()

    elif command == "unzip":
        DataPacketHandler.extractPacket(sys.argv[2])

    else:
        result = {"status": "error", "message": "Unknown command"}

    print(orjson.dumps(result).decode())


if __name__ == "__main__":
    main()