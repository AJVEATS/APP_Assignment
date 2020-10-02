from flask import Flask, jsonify, request

app = Flask(__name__)


@app.route("/")
# path for the web page
def main_application():
    return app.send_static_file('users.html')
    # Returns the html file users.html for it to be displayed


@app.route('/users.html')
# path to see if the server can see the html file
def send_test():
    return app.send_static_file('users.html')


@app.route('/css/<file>')
# path to see if the server can see the css file
def send_css(file):
    return app.send_static_file('css/' + file)
    # Returns the html file for it to be displayed


@app.route('/js/<file>')
# path to see if the server can see the js file
def send_js(file):
    return app.send_static_file('js/' + file)
    # Returns the html file for it to be displayed


# V the list of dictionaries used to store all of the users and their information
userList = [
    {'id': 1,
     "email": "daniel.dumile@reqres.in",
     "first_name": "Daniel",
     "last_name": "Dumile",
     "avatar": "https://pm1.narvii.com/6728/1d99fd646a2ebe35fb0c2af31322196f578b0438v2_128.jpg"},
    {'id': 2,
     "email": "oliver.francis@reqres.in",
     "first_name": "Oliver ",
     "last_name": "Francis",
     "avatar": "https://66.media.tumblr.com/avatar_16a290bfcc21_128.pnj"},
    {'id': 3,
     "email": "jack.harlow@reqres.in",
     "first_name": "Jack",
     "last_name": "Harlow",
     "avatar": "https://assets.change.org/photos/9/tt/jk/ATTtJkWLwJVoiPa-128x128-noPad.jpg"},
    {'id': 4,
     "email": "emma.wong@reqres.in",
     "first_name": "Emma",
     "last_name": "Wong",
     "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/olegpogodaev/128.jpg"},
    {'id': 5,
     "email": "eve.holt@reqres.in",
     "first_name": "Eve",
     "last_name": "Holt",
     "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/marcoramires/128.jpg"},
    {'id': 6,
     "email": "charles.morris@reqres.in",
     "first_name": "Charles",
     "last_name": "Morris",
     "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/stephenmoon/128.jpg"},
    {'id': 7,
     "email": "scott.mescudi@reqres.in",
     "first_name": "Scott",
     "last_name": "Mescudi",
     "avatar": "https://66.media.tumblr.com/735bb8f416c5b991a76487bdc41c8473/b55b4f45bac07829-70/s128x128u_c1/2dd5f74dcb13ddb32406ed0cf8fac8a4df8b444f.jpg"},
    {'id': 8,
     "email": "michael.lawson@reqres.in",
     "first_name": "Micheal",
     "last_name": "Lawson",
     "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/follettkyle/128.jpg"},
    {'id': 9,
     "email": "lindsay.ferguson@reqres.in",
     "first_name": "Lindsey",
     "last_name": "Ferguson",
     "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/araa3185/128.jpg"},
    {'id': 10,
     "email": "tobias.funke@reqres.in",
     "first_name": "Tobias",
     "last_name": "Funke",
     "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/vivekprvr/128.jpg"},
    {'id': 11,
     "email": "byron.fields@reqres.in",
     "first_name": "Byron",
     "last_name": "fields",
     "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/russoedu/128.jpg"},
    {'id': 12,
     "email": "george.edwards@reqres.in",
     "first_name": "George",
     "last_name": "Edwards",
     "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/mrmoiree/128.jpg"}
]


@app.route('/api/users', methods=['GET'])
# GET API pathway for the GET request of all users
def getUserList():
    pageNo = int(request.args["page"]) - 1
    userSlice = userList[pageNo * 6:(pageNo + 1) * 6]
    # V splits the list into pages of six users which is then sent over to the front end
    return jsonify({"per_page": 6,
                    "page": pageNo + 1,
                    "total": len(userList),
                    "total_pages": (len(userList) + 5) // 6,
                    "data": userSlice})


@app.route('/api/users/<userID>', methods=['GET'])
# GET API pathway for the GET request of a single user
def getSingleUser(userID):
    userInt = int(userID) - 1
    if userInt < len(userList):
        user = userList[userInt]
        return jsonify({"data": user})
    else:
        # validation tests if the users is an actual user
        return "missing user", 404


@app.route("/api/user/<updatedUserJSON>", methods=['PUT'])
def updateUser(updatedUserJSON):
    # V removes the {" and "} from the string
    updatedUserJSON = updatedUserJSON[1:-1]
    # V Splits the string by the commas
    updatedUserData = updatedUserJSON.split(',')
    # V Removes all unnecessary info to get the actual values
    userID = int(updatedUserData[0][5:])
    userEmail = updatedUserData[1][9:-1]
    userFirstName = updatedUserData[2][14:-1]
    userLastName = updatedUserData[3][13:-1]
    # print(userID)
    # print(userEmail)
    # print(userFirstName)
    # print(userLastName)
    # print(userList[userID]["id"])
    # V Creates the users dictionary index of list from their userID
    userIndex = userID - 1

    # V updates all of the values with the updated values
    userList[userIndex]["id"] = userID
    userList[userIndex]["email"] = userEmail
    userList[userIndex]["first_name"] = userFirstName
    userList[userIndex]["last_name"] = userLastName

    return updatedUserJSON


@app.route('/api/user/<userID>', methods=['DELETE'])
def deleteUser(userID):
    # V Creates a variable for the users index in the list using the passed userID
    userIndex = int(userID) - 1
    # print("Before delete ")
    # print(userList[userIndex])
    # print(userList[userID - 1])
    # V Removes that users dictionary from the list
    del userList[userIndex]
    # print("After delete")
    # print(userList)
    return userID


@app.route("/api/user/<newUserJSON>", methods=['POST'])
def createUser(newUserJSON):
    # print(newUserJSON)
    newUserJSON = newUserJSON[1:-1]
    newUserData = newUserJSON.split(',')
    userID = int(newUserData[0][5:]) + (len(userList) - 1)
    userEmail = newUserData[1][9:-1]
    userFirstName = newUserData[2][14:-1]
    userLastName = newUserData[3][13:-1]
    """
    print(userID)
    print(userEmail)
    print(userFirstName)
    print(userLastName)
    """
    userList.append(
        {'id': userID,
         "email": userEmail,
         "first_name": userFirstName,
         "last_name": userLastName,
         "avatar": "https://files.gamebanana.com/img/ico/sprays/5db93d0aac35e.gif"
         })

    return newUserJSON


if __name__ == '__main__':
    app.run()
