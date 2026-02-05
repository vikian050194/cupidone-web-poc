class ChecklistItem {
    constructor(name, state) {
        this.name = name;
        this.state = state;
    }
}

class Card {
    constructor(id, title, description, state, checklistName, checklist, types, createdAt) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.state = state;
        this.checklistName = checklistName;
        this.checklist = checklist;
        this.types = types;
        this.createdAt = createdAt;
    }
}

const cards = [
    new Card(
        id = 1,
        title = "Converter from Trello to cupidone.md",
        description = [
            "Make Trello to cupidone.md converter to make migration possible."
        ],
        state = "done",
        checklistName = "Sub-tasks",
        checklist = [
            new ChecklistItem("foo", "incomplete"),
            new ChecklistItem("bar", "complete")
        ],
        types = ["business"],
        createdAt = "2025-12-12T23:19:00"
    ),
]

class CardState {
    static BACKLOG = "backlog";
    static TODO = "to do";
    static INPROGRESS = "in progress";
    static DONE = "done";
    static OUTDATED = "outdated";
}

const cardStateEmojiesMap = {
    [CardState.BACKLOG]: "🔵",
    [CardState.TODO]: "⚪",
    [CardState.INPROGRESS]: "🟡",
    [CardState.DONE]: "🟢",
    [CardState.OUTDATED]: "⭕"
}

class ChecklistItemState {
    static INCOMPLETE = "incomplete";
    static COMPLETE = "complete";
}

const checklistStateEmojiesMap = {
    [ChecklistItemState.INCOMPLETE]: "⚪",
    [ChecklistItemState.COMPLETE]: "🟢",
}

window.addEventListener("load", () => {
    const $rootElement = document.documentElement;
    const $modal = document.getElementById("modal-one");

    const openModal = (cardId) => {
        const card = cards.find(({ id }) => id === cardId);
        $modal.querySelector("#modal-title").innerHTML = card.title;
        $modal.querySelector("#modal-created-at").innerHTML = card.createdAt;
        $modal.querySelector("#modal-type").innerHTML = card.types.map(p => `<span>${p}</span>`).join(", ");
        $modal.querySelector("#modal-state").innerHTML = `${cardStateEmojiesMap[card.state]} ${card.state}`;
        $modal.querySelector("div.description").innerHTML = card.description.map(p => `<p>${p}</p>`).join("");
        if (card.checklistName) {
            $modal.querySelector("div.checklist").innerHTML = card.checklist.map(item => `<p>${checklistStateEmojiesMap[item.state]} ${item.name}</p>`).join("");
        } else {
            $modal.querySelector("div.checklist").innerHTML = "empty";
        }
        $modal.classList.add("open");
        const exits = $modal.querySelectorAll(".modal-exit");
        exits.forEach(function (exit) {
            exit.addEventListener("click", function (event) {
                event.preventDefault();
                $modal.classList.remove("open");
            });
        });
    };

    document.querySelectorAll("div.card").forEach(function (trigger) {
        trigger.addEventListener("click", function (event) {
            event.preventDefault();
            const cardIdValue = event.target.getAttribute("data-card-id");
            const cardId = parseInt(cardIdValue);
            openModal(cardId);
        });
    });
});