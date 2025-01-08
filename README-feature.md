## **1. Testing the Deployed Application on Render**

This section provides a **brief feature-wise list** on how users can interact with the key features of the application.

---

## **Features Implemented in This Sprint**

These are the newly implemented features for this sprint.

### 1. **Voting on Questions and Answers**

- **How to Use**:
  - Users must **log in** to vote.
  - Navigate to any question page and **upvote or downvote** the question or its answers.
  - Unauthenticated users attempting to vote will see an alert message, "Please log in to vote."
  - Users cannot vote on the same question/answer multiple times.

### 2. **Commenting on Questions and Answers**

- **How to Use**:
  - Users must **log in** to add comments.
  - On a question or answer page, click on the **"Add Comment"** button, type the comment, and submit it.
  - Users can add multiple comments to the same question or answer.

### 3. **User Login**

- **How to Use**:
  - Click on the **"Login"** button in the header.
  - Enter a **valid username and password** and click the **Login** button.
  - On successful login, the user is redirected to the homepage, and the **User Profile** appears in the header.

### 4. **User Registration**

- **How to Use**:
  - Click on the **"SignUp"** button in the header.
  - Enter a **unique username, email, and password**.
  - Click the **"Sign Up"** button.
  - Upon successful registration, the user is redirected to the homepage, and the **User Profile** appears in the header.

### 5. **User Profile**

- **How to Use**:
  - Once logged in, click on the **User Profile** in the header.
  - View and edit your personal details like username and bio.

---

## **Other Existing Features**

These features were implemented in previous sprints.

### 1. **View Questions by Newest and Active Order**

- **How to Use**:
  - On the homepage, click on the **"Newest"** or **"Active"** tabs to view questions sorted by:
    - **Newest**: Recently created questions.
    - **Active**: Questions with the most recent answers or activity.
  - You can switch between these views at any time.

### 2. **Show Questions by Recent Answers**

- **How to Use**:
  - Click on the **"Active"** tab on the homepage to view questions ordered by recent activity.
  - After navigating away (e.g., to Tags), you can return to this view by clicking **"Active"** again.

### 3. **Show Unanswered Questions**

- **How to Use**:
  - Click on the **"Unanswered"** tab to view all questions in the database that do not have any answers.
  - If you ask a question, it will automatically appear in the **Unanswered** tab until it is answered.

### 4. **View and Interact with Tags**

- **How to Use**:
  - Click on the **"Tags"** link in the menu to view a list of tags.
  - Click on a tag to see all questions associated with that tag.
  - New tags are created when users add them to their questions.

### 5. **Create a Question and Verify Answers**

- **How to Use**:
  - **Log in** to create a question.
  - Click on **"Ask a Question"**, enter the question title, description, and tags, then submit it.
  - After creating a question, you can add multiple answers to it.

### 6. **View Questions by Newest and Active Order**

- **How to Use**:
  - Users can view questions in **Newest** (recently created) or **Active** (recently answered) order.
  - Click the corresponding tabs on the homepage.
