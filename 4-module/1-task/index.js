function makeFriendsList(friends) {
  let ul = document.createElement('ul');
  friends.forEach(element => {
    let li = document.createElement('li');
    li.textContent = element.firstName + ' ' + element.lastName;
    ul.append(li);
  });
  return ul;
}
