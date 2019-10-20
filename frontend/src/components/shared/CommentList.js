import React from "react";
import Comment from "../shared/Comment";
import "../../css/CommentList.css";

const CommentList = () => {
  const comments = [
    {
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in ",
      author: { name: "author1", id: 1 },
      children: [
        {
          text:
            "asdasdasda sdasdasdasdasdadsdasdasdasd dddddddddddddddddddd ddddddddddd dddddddddddddd dddddddddddd",
          author: { name: "jjjjjjjjjjjjj", id: 6 }
        },
        {
          text: "asdasda sdasdasdasda dasdadsdasda sdasd",
          author: { name: "jjjjjjjjjjjjj", id: 6 }
        },
        {
          text: "asdasdasda sdasdasdasdasd adsdasdasda sd",
          author: { name: "jjjjjjjjjjjjj", id: 6 }
        }
      ]
    },
    { text: "Comment 2", children: [], author: { name: "author2", id: 2 } },
    { text: "Comment 3", children: [], author: { name: "author3", id: 3 } },
    { text: "Comment 4", children: [], author: { name: "author4", id: 4 } },
    { text: "Comment 5", children: [], author: { name: "author5", id: 5 } }
  ];
  return (
    <div className="comments-container">
      {comments.map(el => {
        return (
          <div>
            <Comment comment={el} />
            {el.children.length > 0 ? (
              <div style={{ paddingLeft: "25px" }}>
                {el.children.map(child => (
                  <Comment comment={child} />
                ))}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

export default CommentList;
