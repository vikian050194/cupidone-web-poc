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

const makeCardFromDict = source => {
    const checklist = [];
    for (const item of source["checklist"]) {
        checklist.push(new ChecklistItem(item["name"], item["state"]));
    }
    return new Card(
        source["id"],
        source["title"],
        source["description"],
        source["state"],
        source["checklistName"],
        checklist,
        source["types"],
        source["createdAt"]
    );
}

var foo = [
    {
        id: 1,
        title: "aaaaa",
        description: [
            "aaaaa",
            "aaaaa",
            "aaaaa"
        ],
        state: "backlog",
        checklistName: "AAAAA",
        checklist: [
            {
                name: "aaaaa 1",
                state: "incomplete"
            }, {
                name: "aaaaa 2",
                state: "incomplete"
            }
        ],
        types: ["bug"],
        createdAt: "2025-12-12T23:19:00"
    }
]

var bar = foo.map(makeCardFromDict);

const cards = [
    new Card(
        id = 1,
        title = "aaaaa",
        description = [
            "aaaaa",
            "aaaaa",
            "aaaaa"
        ],
        state = "backlog",
        checklistName = "AAAAA",
        checklist = [
            new ChecklistItem("aaaaa 1", "incomplete"),
            new ChecklistItem("aaaaa 2", "incomplete")
        ],
        types = ["bug"],
        createdAt = "2025-12-12T23:19:00"
    ),
    new Card(
        id = 2,
        title = "bbbbb",
        description = [
            "bbbbb",
            "bbbbb",
            "bbbbb"
        ],
        state = "to do",
        checklistName = "BBBBB",
        checklist = [
            new ChecklistItem("bbbbb 1", "incomplete"),
            new ChecklistItem("bbbbb 2", "incomplete")
        ],
        types = ["tech"],
        createdAt = "2025-12-12T23:19:00"
    ),
    new Card(
        id = 3,
        title = "ccccc",
        description = [
            "ccccc",
            "ccccc",
            "ccccc"
        ],
        state = "in progress",
        checklistName = "CCCCC",
        checklist = [
            new ChecklistItem("ccccc 1", "complete"),
            new ChecklistItem("ccccc 2", "incomplete")
        ],
        types = ["business"],
        createdAt = "2025-12-12T23:19:00"
    ),
    new Card(
        id = 4,
        title = "ddddd",
        description = [
            "ddddd",
            "ddddd",
            "ddddd"
        ],
        state = "done",
        checklistName = "DDDDD",
        checklist = [
            new ChecklistItem("ddddd 1", "complete"),
            new ChecklistItem("ddddd 2", "complete")
        ],
        types = ["marketing"],
        createdAt = "2025-12-12T23:19:00"
    ),
    new Card(
        id = 5,
        title = "eeeee",
        description = [
            "eeeee",
            "eeeee",
            "eeeee"
        ],
        state = "outdated",
        checklistName = "EEEEE",
        checklist = [
            new ChecklistItem("eeeee 1", "incomplete"),
            new ChecklistItem("eeeee 2", "incomplete")
        ],
        types = ["bug", "tech", "business", "marketing"],
        createdAt = "2025-12-12T23:19:00"
    ),
    new Card(
        id = 6,
        title = "fffff",
        description = [
            "fffff",
            "fffff",
            "fffff"
        ],
        state = "done",
        checklistName = "FFFFF",
        checklist = [
            new ChecklistItem("fffff 1", "complete"),
            new ChecklistItem("fffff 2", "complete")
        ],
        types = ["marketing"],
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
            $modal.querySelector("#modal-checklist-name").innerHTML = card.checklistName;
            $modal.querySelector("#modal-checklist-items").innerHTML = card.checklist.map(item => `<div>${checklistStateEmojiesMap[item.state]} ${item.name}</div>`).join("");
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

    const onCardClick = function (event) {
        event.preventDefault();
        const cardIdValue = event.target.getAttribute("data-card-id");
        const cardId = parseInt(cardIdValue);
        openModal(cardId);
    };

    const columnsMap = {};

    document.querySelectorAll("div.column").forEach(function (column) {
        const solumnState = column.getAttribute("data-column-state");
        columnsMap[solumnState] = column;
    });

    cards.forEach((card) => {
        const cardText = document.createTextNode(`${cardStateEmojiesMap[card.state]} ${card.title}`);
        const cardFace = document.createElement("div");
        cardFace.setAttribute("data-card-id", card.id);
        cardFace.classList.add("card");
        cardFace.appendChild(cardText);
        cardFace.addEventListener("click", onCardClick);
        columnsMap[card.state].appendChild(cardFace);
    })
});