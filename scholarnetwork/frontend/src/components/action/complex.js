import axios from "axios";
import 'regenerator-runtime/runtime';

// # Representation of published_in table
// returns: int_1 = journals.id, str_1 = journals.name, int_2 = articles.id, str_2 = articles.title, str_3 = articles.authors
export const articlesInJournal = async(req,res) => {
  await axios
  .get("api/complex/articlesinjournal/" + req.content)
  .then((result) => {
    res.data = result.data;
    res.msg = "search succeed";
  })
  .catch((err) => {
    res.data = [];
    res.msg = "server error";
  });

};

// # Representation of published_by table
// # returns: int_1 = publishers.id, str_1 = publishers.name, int_2 = articles.id, str_2 = articles.title, str_3 = articles.authors
export const articlesFromPublisher = async(req,res) => {
  await axios
    .get("api/complex/articlesfrompublisher/" + req.content)
    .then((result) => {
      console.log(result);
      res.data = result.data;
      res.msg = "search succeed";
    })
    .catch((err) => {
      res.data = [];
      res.msg = "server error";
    });
};

// # Computes all journals' average h-index based on the h-index of contributing authors
// # returns: int_1 = journals.id, str_1 = journals.name, dec_1 = average h_index, int_2 = number of authors
export const journalAvgHindex = async(res) => {
  await axios
    .get("api/complex/journalavghindex/")
    .then((result) => {
      res.data = result.data;
      res.msg = "search succeed";
    })
    .catch((err) => {
      res.data = [];
      res.msg = "server error";
    });
};

// # Computes all publishers' average h-index based on the h-index of contributing authors
// # returns: int_1 = publishers.id, str_1 = publishers.name, dec_1 = average h_index, int_2 = number of authors
export const publisherAvgHindex = async(res) => {
  await axios
    .get("api/complex/publisheravghindex/")
    .then((result) => {

      res.data = result.data;
      res.msg = "search succeed";
    })
    .catch((err) => {
      res.data = [];
      res.msg = "server error";
    });
};


// # Computes the number of journals a publisher has published
// # returns: int_1 = publishers.id, str_1 = publishers.name, int_2 = number of journals
export const publisherJournalPublished = async(res) => {
  await axios
    .get("api/complex/publisherjournalspublished/")
    .then((result) => {

      res.data = result.data;
      res.msg = "search succeed";
    })
    .catch((err) => {
      res.data = [];
      res.msg = "server error";
    });
};

// # Computes the number of journals an author has contributed to
// # returns: int_1 = authors.id, str_1 = authors.name, int_2 = number of journals
export const authorJournalPublishedIn = async(res) => {
  await axios
    .get("api/complex/authorjournalspublishedin/")
    .then((result) => {

      res.data = result.data;
      res.msg = "search succeed";
    })
    .catch((err) => {
      res.data = [];
      res.msg = "server error";
    });
};

// # Computes citedby statistics for a journal (avg, total, num articles)
// # returns: int_1 = journals.id, str_1 = journals.name, dec_1 = average citedby, int_2 = total citedby, int_3 = number of articles
export const journalCitedByStat = async(res) => {
  await axios
    .get("api/complex/journalcitedbystats/")
    .then((result) => {

      res.data = result.data;
      res.msg = "search succeed";
    })
    .catch((err) => {
      res.data = [];
      res.msg = "server error";
    });
};

// # Computes citedby statistics for a publisher (avg, total, num articles)
// # returns: int_1 = publishers.id, str_1 = publishers.name, dec_1 = average citedby, int_2 = total citedby, int_3 = number of articles
export const publisherCitedByStat = async(res) => {
  await axios
    .get("api/complex/publishercitedbystats/")
    .then((result) => {

      res.data = result.data;
      res.msg = "search succeed";
    })
    .catch((err) => {
      res.data = [];
      res.msg = "server error";
    });
};
